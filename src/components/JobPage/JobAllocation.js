import React from 'react'

// Styling
import styles from './JobAllocation.module.scss'

// Chart.js
import Chart from 'chart.js'

// Import API
import { api } from '../../api'

class SingleNode extends React.Component {
  constructor(props) {
    super(props)

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    const { labels, datasets, tooltips } = this.props.chartData
    const ctx = document.getElementById(`single-node-${this.props.name}`)
    
    // Construct Chart From Props.
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets
      },
      options: {
        tooltips
      }
    })
  }

  render() {
    return (
      <div className={styles['single-node-container']} style={{width:`calc(100% / ${this.props.nodeCount})`}}>
        <canvas id={`single-node-${this.props.name}`}></canvas>
      </div>
    )
  }
}

class JobAllocation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      chartData: []
    }

    this.chartData = []
    this.colorIndex = 0

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    const { data } = await api('/resource/allocation')

    this.setState({ data }, this.createChart)
  }

  pickAColor() {
    const colorSequence = ['rgba(255, 52, 95, 0.6)', 'rgba(255, 134, 49, 0.6)', 'rgba(255, 187, 63, 0.6)', 'rgba(50, 184, 183, 0.6)', 'rgba(32, 151, 228, 0.6)', 'rgba(145, 88, 250, 0.6)']
    const result = colorSequence[this.colorIndex]
    this.colorIndex += 1
    if (this.colorIndex === colorSequence.length) {
      this.colorIndex = 0
    }
    return result
  }

  constructDataWithDummy(nodePods, jobNameList) {
    if (nodePods === null) return
    let totalPercentageNow = 0
    let data = new Array(jobNameList.length).fill(0)

    nodePods.forEach(pod => {
      totalPercentageNow += pod.percentage
      data[jobNameList.indexOf(pod.job_name)] += pod.percentage
    })

    // Add Dummy
    data.push(100 - totalPercentageNow)

    return data
  }

  createChart() {
    const jobToColor = []
    const newChartData = this.state.data.map(node => {
      const jobNameList = node.pods === null ? [] : [ ...new Set(node.pods.map(p => p.job_name)) ]
      // Register Color
      jobNameList.forEach(name => {
        if (jobToColor.findIndex(map => map[0] === name) === -1) {
          jobToColor.push([name, this.pickAColor()])
        }
      })

      let bgColors = node.pods === null ? 'rgb(34, 37, 41)' : jobNameList.map(name => jobToColor.find(map => map[0] === name)[1])
      if (node.pods !== null) bgColors.push('rgb(34, 37, 41)')
      let labels = node.pods === null ? [ 'None' ] : jobNameList
      if (node.pods !== null) labels.push("Unused")
      const data = {
        labels,
        datasets: [{
          backgroundColor: bgColors,
          data: node.pods === null ? [100] : this.constructDataWithDummy(node.pods, jobNameList)
        }],
        tooltips: {
          callbacks: {
            label: (tooltip, data) => {
              if (node.pods === null) {
                return "Free"
              } else {
                if (tooltip.index === data.datasets[tooltip.datasetIndex].data.length-1) return "Unused"
                const jobName = data.labels[tooltip.index]
                return `${jobName}: ${node.pods.filter(pod => pod.job_name === jobName).map(pod => `${pod.replica_type}-${pod.replca_index}`).join(', ')}`
              }
            }
          }
        }
      }

      return {
        data,
        name: node.node_name
      }
    })

    this.setState({ chartData: newChartData })
  }

  render() {
    return (
      <div className={styles['container']}>
        {
          this.state.chartData.map(chartData => (
            <SingleNode key={chartData.name} chartData={chartData.data} name={chartData.name} nodeCount={this.chartData.length} />
          ))
        }
      </div>
    )
  }
}

export default JobAllocation
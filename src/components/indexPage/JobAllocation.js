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
      data: []
    }

    this.chartData = []
    this.colorIndex = 0

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    const { data } = await api('/resource/allocation')

    this.setState({ data })
  }

  pickAColor() {
    const colorSequence = ['rgb(255, 52, 95)', 'rgb(255, 134, 49)', 'rgb(255, 187, 63)', 'rgb(50, 184, 183)', 'rgb(32, 151, 228)', 'rgb(145, 88, 250)']
    const result = colorSequence[this.colorIndex]
    this.colorIndex += 1
    if (this.colorIndex === colorSequence.length) {
      this.colorIndex = 0
    }
    return result
  }
  createChart() {
    const jobToColor = []
    this.chartData = this.state.data.map(node => {
      const jobNameList = node.pods === null ? [] : [ ...new Set(node.pods.map(p => p.job_name)) ]
      // Register Color
      jobNameList.forEach(name => {
        if (jobToColor.findIndex(map => map[0] === name) === -1) {
          jobToColor.push([name, this.pickAColor()])
        }
      })

      const data = {
        labels: node.pods === null ? [ 'None' ] : jobNameList,
        datasets: [{
          backgroundColor: node.pods === null ? 'rgb(62, 67, 74)' : [ jobNameList.map(name => jobToColor.find(map => map[0] === name))[0][1] ],
          data: node.pods === null ? [100] : jobNameList.map(_ => 100 / jobNameList.length)
        }],
        tooltips: {
          callbacks: {
            label: () => node.pods === null ? "Free" : jobNameList.map(jobName => {
              return `${jobName}: ${node.pods.filter(pod => pod.job_name === jobName).map(pod => `${pod.replica_type}-${pod.replca_index}`).join(', ')}`
            })
          }
        }
      }

      return {
        data,
        name: node.node_name
      }
    })

    console.log(jobToColor)
    console.log(this.chartData)
    console.log("Chart Data End")
  }

  render() {
    this.createChart()

    return (
      <div className={styles['container']}>
        {
          this.chartData.map(chartData => (
            <SingleNode key={chartData.name} chartData={chartData.data} name={chartData.name} nodeCount={this.chartData.length} />
          ))
        }
      </div>
    )
  }
}

export default JobAllocation
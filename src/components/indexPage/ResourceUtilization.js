import React from 'react'

// Chart.js
import Chart from 'chart.js'

// Styles
import styles from './ResourceUtilization.module.scss'

// Import API
import { api } from '../../api'

class ResourceUtilization extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      chart: null
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    const { data } = await api('resource/utilization')
    this.setState({ data })

    // Create Chart
    this.createChart()
  }

  createChart() {
    // Prepare Data Set
    const labels = this.state.data.map(node => node['node_name'])
    const datasets = [
      {
        label: 'Cpu Percentage',
        backgroundColor: 'rgba(246, 189, 78, 0.4)',
        borderColor: 'rgb(246, 189, 78)',
        borderWidth: 1,
        barPercentage: 0.5,
        data: this.state.data.map(node => node.cpu_percentage)
      },
      {
        label: 'Memory Percentage',
        backgroundColor: 'rgba(235, 81, 70, 0.4)',
        borderColor: 'rgb(235, 81, 70)',
        borderWidth: 1,
        barPercentage: 0.5,
        data: this.state.data.map(node => node.mem_percentage)
      }
    ]

    // Construct Chart
    const ctx = document.getElementById('resource-utilization')
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets
      },
      options: {
        tooltips: {
          callbacks: {
            label: (target) => {
              const nodeInfo = this.state.data.find(node => node.node_name === target.label)
              console.log(nodeInfo)
              if (target.datasetIndex === 0) {
                return `CPU Usage: ${nodeInfo.aggregate_cpu} / ${nodeInfo.maxima_cpu} core(s)`
              } else {
                return `Memory Usage: ${nodeInfo.aggregate_mem} / ${nodeInfo.maxima_mem.slice(0, -2)} Ki`
              }
            }
          }
        },
        scales: {
          yAxes: [{
            type: 'linear',
            ticks: {
              min: 0,
              max: 100,
            }
          }]
        }
      }
    })

    this.setState({ chart })
  }

  render() {
    return (
      <div className={styles.container}>
         <canvas id="resource-utilization"></canvas>
      </div>
    )
  }
}

export default ResourceUtilization
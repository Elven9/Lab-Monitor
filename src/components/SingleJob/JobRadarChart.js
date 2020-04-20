import React from 'react'

// Chart.js
import Chart from 'chart.js'

// Styles
import styles from './JobRadarChart.module.scss'

class JobRadarChart extends React.Component {

  constructor(props) {
    super(props)

    this.componentDidUpdate = this.componentDidUpdate.bind(this)
  }

  componentDidUpdate() {
    const ctx = document.getElementById('job-radar-chart')

    // Construct Chart Data
    const workerCount = new Array(this.props.node.length).fill(0)
    const psCount = new Array(this.props.node.length).fill(0)

    if (this.props.data.worker_node_pair !== null) {
      this.props.data.worker_node_pair.forEach(pod => {
        if (pod.worker.includes('worker'))
          workerCount[this.props.node.indexOf(pod.node)]++
        else
          psCount[this.props.node.indexOf(pod.node)]++
      })
    }

    // Max Length
    const maxScale = workerCount.slice(0, workerCount.length).sort()[workerCount.length-1]

    new Chart(ctx, {
      type: "radar",
      data: {
        labels: this.props.node,
        datasets: [
          {
            label: "Worker",
            borderColor: 'rgba(255, 52, 95)',
            backgroundColor: "rgba(255, 52, 95, 0.6)",
            data: workerCount
          },
          {
            label: "Parameter Sever",
            borderColor: 'rgba(246, 189, 78)',
            backgroundColor: "rgba(246, 189, 78, 0.6)",
            data: psCount
          }
        ]
      },
      options: {
        title: {
          display: true,
          position: 'bottom',
          text: "Worker 分布在各個 Node 上狀況"
        },
        tooltips: {
          callbacks: {
            label: (tooltip, data) => `On ${data.labels[tooltip.index]}, ps: ${data.datasets[tooltip.datasetIndex].data[tooltip.index]}; worker: ${data.datasets[tooltip.datasetIndex].data[tooltip.index]}`
          }
        },
        scale: {
          gridLines: {
            color: "rgb(255, 255, 255)"
          },
          ticks: {
            min: 0,
            max: maxScale > 3 ? maxScale : 3,
            stepSize: 1
          }
        }
      }
    })
  }

  render() {
    if (this.props.data === null) return null
    return (
      <div className={styles['container']}>
        <canvas id="job-radar-chart"></canvas>
      </div>
    )
  }
}

export default JobRadarChart
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
    const nodePodCount = new Array(this.props.node.length).fill(0)

    this.props.data.worker_node_pair.forEach(pod => {
      if (!pod.worker.includes('worker')) return
      nodePodCount[this.props.node.indexOf(pod.node)]++
    })

    // Max Length
    const maxScale = nodePodCount.slice(0, nodePodCount.length).sort()[nodePodCount.length-1]

    new Chart(ctx, {
      type: "radar",
      data: {
        labels: this.props.node,
        datasets: [
          {
            label: this.props.data.info.job_name,
            borderColor: 'rgba(255, 52, 95)',
            backgroundColor: "rgba(255, 52, 95, 0.6)",
            data: nodePodCount
          },
        ]
      },
      options: {
        title: {
          display: true,
          position: 'bottom',
          text: "Worker 分布在各個 Node 上狀況"
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
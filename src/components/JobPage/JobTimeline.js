import React from 'react'

// Moment.js
import Moment from 'moment'

// Chart.js
import Chart from 'chart.js'

// Api
import { api } from '../../api'

// Styles
import styles from './JobTimeline.module.scss'

// Setting
const colors = {
  "WAITING_COLOR": "235, 81, 70",     // Start Time
  "RUNNING_COLOR": "246, 189, 78",    // End Time
  "EMPTY_COLOR": "34, 37, 41"         // Submission Time
}

class JobTimeline extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    const { data } = await api('/job/getJobs')


    // Update State
    if (data != null) {
      this.setState({
        data: data.map(({job_name, submission_time, start_time, end_time}) => ({
          job_name,
          submission_time: submission_time === "" ? Moment().unix() : Moment(submission_time).unix(),
          start_time: start_time === "" ? Moment().unix() : Moment(start_time).unix(),
          end_time: end_time === "" ? Moment().unix() : Moment(end_time).unix()
        }))
      }, this.createChart)
    } else {
      this.createChart()
    }
  }

  tooltipConvert(datasetIndex) {
    switch(datasetIndex) {
      case 0:
        return 'Submit Time'
      case 1:
        return 'Start Time'
      case 2:
        return 'End Time'
      default:
        return ''
    }
  }

  createChart() {
    const ctx = document.getElementById('job-timeline-canvas')
    const labels = this.state.data.map(job => job.job_name)

    // Get Suggestion Min
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].submission_time < min) {
        min = this.state.data[i].submission_time
      }
      if (this.state.data[i].end_time > max) {
        max = this.state.data[i].end_time
      }
    }

    new Chart(ctx, {
      type: 'horizontalBar',
      data: {
        labels,
        datasets: [
          {
            // Submission
            label: "",
            backgroundColor: `rgb(${colors['EMPTY_COLOR']})`,
            borderColor: `rgb(${colors['EMPTY_COLOR']})`,
            data: this.state.data.map((job, index) => (job.submission_time - min)),
            barPercentage: 0.2
          },
          {
            // Waiting
            label: "Waiting Time",
            backgroundColor: `rgba(${colors['WAITING_COLOR']}, 0.7)`,
            borderColor: `rgb(${colors['WAITING_COLOR']})`,
            data: this.state.data.map((job, index) => (job.start_time - min)),
            barPercentage: 0.2
          },
          {
            // Running
            label: "Running Time",
            backgroundColor: `rgba(${colors['RUNNING_COLOR']}, 0.7)`,
            borderColor: `rgb(${colors['RUNNING_COLOR']})`,
            data: this.state.data.map((job, index) => (job.end_time - min)),
            barPercentage: 0.2
          }
        ]
      },
      options: {
        tooltips: {
          callbacks: {
            label: (tooltip) => {
              return `${this.tooltipConvert(tooltip.datasetIndex)}: ${Moment.unix(tooltip.xLabel + min).format("kk:mm:ss MMMM Do, YYYY")}`
            }
          }
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              ticks: {
                min: 0,
                max: max - min,
                callback: (value) => {
                  return Moment.unix(value + min).format("kk:mm:ss,MMMM Do YYYY")
                },
                autoSkipPadding: 50
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
            }
          ]
        }
      }
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <canvas id="job-timeline-canvas" />
      </div>
    )
  }
}

export default JobTimeline
import React from 'react'

// React Router Dom
import { withRouter } from "react-router";

// Import API
import { api } from '../api/index'

// Component
import StaticInfo from '../components/SingleJob/StaticInfo'
import JobRadarChart from '../components/SingleJob/JobRadarChart'

// Styles
import styles from './SingleJob.module.scss'

class SingleJob extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      nodeNameList: []
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    const { data } = await api(`/job/getJob?name=${this.props.match.params.id}`)
    const nodeList = await api('/system/hardwareSpec')

    this.setState({
      data,
      nodeNameList: nodeList.data.map(node => node.node_name)
    })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <h1 className={styles.header}>Job Info</h1>
          <div className={styles['split-panel']}>
            <StaticInfo data={this.state.data} />
            <JobRadarChart data={this.state.data} node={this.state.nodeNameList} />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SingleJob)
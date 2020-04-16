import React from 'react'

// React Router Dom
import { withRouter } from "react-router";

// Import API
import { api } from '../api/index'

// Component
import StaticInfo from '../components/SingleJob/StaticInfo'

// Styles
import styles from './SingleJob.module.scss'

class SingleJob extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    const { data } = await api(`/job/getJob?name=${this.props.match.params.id}`)

    this.setState({ data })
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <h1 className={styles.header}>Job Info</h1>
          <div className={styles['split-panel']}>
            <StaticInfo data={this.state.data} />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SingleJob)
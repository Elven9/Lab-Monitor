import React from 'react'

// Conponent
import JobAllocation from '../components/JobPage/JobAllocation'
import JobList from '../components/JobPage/JobList'

// Styles
import styles from './page.module.scss'

class Job extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <h1 className={styles.header}>Job Allocation Status</h1>
          <JobAllocation />
        </div>
        <div className={styles.section}>
          <h1 className={styles.header}>Job List</h1>
          <JobList />
        </div>
      </div>
    )
  }
}

export default Job
import React from 'react'

// Page Component
import SystemInfo from '../components/indexPage/SystemInfo'
import SchedulingOverview from '../components/indexPage/SchedulingOverview'

// Style
import styles from './Index.module.scss'

class Index extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <h1 className={styles.header}>系統狀態</h1>
          <SystemInfo></SystemInfo>
        </div>
        <div className={styles.section}>
          <h1 className={styles.header}>Scheduling Overview</h1>
          <SchedulingOverview />
        </div>
      </div>
    )
  }
}

export default Index
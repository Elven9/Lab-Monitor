import React from 'react'

// Page Component
import SystemInfo from '../components/indexPage/SystemInfo'
import ResourceUtilization from '../components/indexPage/ResourceUtilization'
import SchedulingOverview from '../components/indexPage/SchedulingOverview'

// Style
import styles from './page.module.scss'

class Index extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <h1 className={styles.header}>System General Information</h1>
          <SystemInfo></SystemInfo>
        </div>
        <div className={styles.section}>
          <h1 className={styles.header}>Scheduling Overview</h1>
          <SchedulingOverview />
        </div>
        <div className={styles.section}>
          <h1 className={styles.header}>ResourceUtilization</h1>
          <ResourceUtilization />
        </div>
      </div>
    )
  }
}

export default Index
import React from 'react'

// Page Component
import SystemInfo from '../components/indexPage/SystemInfo'

// Style
import styles from './Index.module.scss'

class Index extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <h1>系統狀態</h1>
          <SystemInfo></SystemInfo>
        </div>
      </div>
    )
  }
}

export default Index
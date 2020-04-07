import React from 'react'

// Page Component
import SystemInfo from '../components/indexPage/SystemInfo'

// Style
import styles from './Index.module.scss'

class Index extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <SystemInfo></SystemInfo>
      </div>
    )
  }
}

export default Index
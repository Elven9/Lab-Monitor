import React from 'react'

// Styles
import styles from './StaticInfo.module.scss'

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function convertStatus(status) {
  switch(status) {
    case 0:
      return 'Success'
    case 1:
      return 'Running'
    case 2:
      return 'Failed'
    case 3:
      return 'Waiting'
    default:
      return ''
  }
}

function StaticInfo({ data }) {
  if (data === null) return null
  return (
    <div className={styles['container']}>
      <List classes={{ root: styles['list-root'] }} dense aria-label="main mailbox folders">
        <ListItem classes={{ root: styles['list-item-root'] }} button>
          <ListItemText primary={`TFJob 名稱： ${data.info.job_name}`} />
        </ListItem>
        <ListItem classes={{ root: styles['list-item-root'] }} button>
          <ListItemText primary={`TFJob UID： ${data.info.job_id}`} />
        </ListItem>
        <ListItem classes={{ root: styles['list-item-root'] }} button>
          <ListItemText primary={`提交時間戳記： ${data.info.submission_time}`} />
        </ListItem>
        <ListItem classes={{ root: styles['list-item-root'] }} button>
          <ListItemText primary={`開始執行時間： ${data.info.start_time}`} />
        </ListItem>
        <ListItem classes={{ root: styles['list-item-root'] }} button>
          <ListItemText primary={`結束執行時間： ${data.info.end_time}`} />
        </ListItem>
        <ListItem classes={{ root: styles['list-item-root'] }} button>
          <ListItemText primary={`執行時長： ${data.info.exe_time}`} />
        </ListItem>
        <ListItem classes={{ root: styles['list-item-root'] }} button>
          <ListItemText primary={`等待時間： ${data.info.wait_time}`} />
        </ListItem>
        <ListItem classes={{ root: styles['list-item-root'] }} button>
          <ListItemText primary={`執行狀態： ${convertStatus(data.info.state)}`} />
        </ListItem>
        <ListItem classes={{ root: styles['list-item-root'] }} button>
          <ListItemText primary={`分散率： ${data.dispersion_rate} (node上有該job的worker / 一個job最少可以用幾個node就能跑)`} />
        </ListItem>
      </List>
    </div>
  )
}

export default StaticInfo
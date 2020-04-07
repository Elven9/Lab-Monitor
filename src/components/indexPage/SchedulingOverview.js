import React from 'react'

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import HourglassFullIcon from '@material-ui/icons/HourglassFull';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssistantIcon from '@material-ui/icons/Assistant';

// Style
import styles from './SchedulingOverview.module.scss'

// API
import { api } from '../../api/index'

class SchedulingOverview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        waiting_job_num: 0,
        running_job_num: 0,
        finish_job_num: 0,
        failed_job_num: 0,
        job_average_waiting_time: 0,
        job_average_completion_time: 0,
      }
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    const { data } = await api('/job/systemwideStatus')

    this.setState({
      data
    })
  }

  render() {
    return (
      <>
        <List component="div" classes={{root: styles.container}}>
          <ListItem classes={{root: styles['red-list-item']}} component="div">
            <ListItemAvatar>
              <Avatar classes={{root: styles['red-avatar']}}>
                <HourglassFullIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText classes={{primary: styles['list-item-text-primary'], secondary: styles['list-item-text-secondary']}} primary="Waiting Job Count" secondary={this.state.data.waiting_job_num} />
          </ListItem>
          <ListItem classes={{root: styles['yellow-list-item']}} component="div">
            <ListItemAvatar>
              <Avatar classes={{root: styles['yellow-avatar']}}>
                <AssignmentLateIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText classes={{primary: styles['list-item-text-primary'], secondary: styles['list-item-text-secondary']}} primary="Running Job Count" secondary={this.state.data.running_job_num} />
          </ListItem>
          <ListItem classes={{root: styles['red-list-item']}} component="div">
            <ListItemAvatar>
              <Avatar classes={{root: styles['red-avatar']}}>
                <BeenhereIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText classes={{primary: styles['list-item-text-primary'], secondary: styles['list-item-text-secondary']}} primary="Finish Job Count" secondary={this.state.data.finish_job_num} />
          </ListItem>
        </List>
        <List component="div" classes={{root: styles.container}}>
          <ListItem classes={{root: styles['red-list-item']}} component="div">
              <ListItemAvatar>
                <Avatar classes={{root: styles['red-avatar']}}>
                  <AssessmentIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText classes={{primary: styles['list-item-text-primary'], secondary: styles['list-item-text-secondary']}} primary="Failed Job Count" secondary={this.state.data.failed_job_num} />
            </ListItem>
            <ListItem classes={{root: styles['yellow-list-item']}} component="div">
              <ListItemAvatar>
                <Avatar classes={{root: styles['yellow-avatar']}}>
                  <AssistantIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText classes={{primary: styles['list-item-text-primary'], secondary: styles['list-item-text-secondary']}} primary="Average Job Wait Time" secondary={`${this.state.data.job_average_waiting_time} Sec`} />
            </ListItem>
            <ListItem classes={{root: styles['red-list-item']}} component="div">
              <ListItemAvatar>
                <Avatar classes={{root: styles['red-avatar']}}>
                  <AssistantIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText classes={{primary: styles['list-item-text-primary'], secondary: styles['list-item-text-secondary']}} primary="Average Job Completion Time" secondary={`${this.state.data.job_average_completion_time} Sec`} />
            </ListItem>
        </List>
      </>
    )
  }
}

export default SchedulingOverview
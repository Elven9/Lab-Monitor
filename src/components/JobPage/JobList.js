import React from 'react'

// API
import { api } from '../../api/index'

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';

// Styles
import styles from './JobList.module.scss'

class JobList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: []
    }

    this.componentDidMount = this.componentDidMount.bind(this)
  }

  async componentDidMount() {
    const { data } = await api('/job/getJobs')

    console.log(data)
    this.setState({ data })
  }

  convertStatus(status) {
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

  render() {
    return (
      <TableContainer component='div'>
        <Table className={styles.table} aria-label="simple table">
          <TableHead classes={{ root: styles['table-head'] }}>
            <TableRow>
              <TableCell classes={{root: styles['table-cell']}}>Job Name</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="right">Submit Time</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="right">Start Time</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="right">End Time</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="right">Execution Time</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="right">Wait Time</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(job => (
              <TableRow key={job.job_id}>
                <TableCell classes={{root: styles['table-cell']}} scope="row">
                  {job.job_name}
                </TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">{job.submission_time}</TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">{job.start_time}</TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">{job.end_time}</TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">{job.exe_time}</TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">{job.wait_time}</TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">
                  <Chip label={this.convertStatus(job.state)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default JobList
import React from 'react'

// API
import { api } from '../../api/index'

// React Router Dom
import { withRouter } from "react-router";

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

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

    if (data !== null) this.setState({ data })
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
              <TableCell classes={{root: styles['table-cell']}} align="right">Worker Pod Count</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="right">Ps Pod Count</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="right">Execution Time</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="right">Wait Time</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="center">Status</TableCell>
              <TableCell classes={{root: styles['table-cell']}} align="right">More Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.map(job => (
              <TableRow key={job.job_name}>
                <TableCell classes={{root: styles['table-cell']}} scope="row">
                  {job.job_name}
                </TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">{job.worker_count}</TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">{job.ps_count}</TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">{job.exe_time}</TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">{job.wait_time}</TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="center">
                  <Chip label={this.convertStatus(job.state)} />
                </TableCell>
                <TableCell classes={{root: styles['table-cell']}} align="right">
                <Button variant="contained" onClick={ () => { this.props.history.push(`/job/${job.job_name.split("/")[1]}`) } }>Link</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default withRouter(JobList)
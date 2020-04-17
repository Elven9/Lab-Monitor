import React from 'react'

// API
import { api } from '../../api/index'

// Materaial UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';

// Style
import styles from './SystemInfo.module.scss'

class SystemInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isLoading: false
    }

    this.componentDidMount = this.componentDidMount.bind(this)

    this.test = 0
  }

  // Life Cycle
  async componentDidMount() {
    this.setState({ isLoading: true })
    const { data } = await api('/system/hardwareSpec')

    this.setState({
      data,
      isLoading: false
    })
  }

  render() {
    return (
      <div className={styles['container']}>
        {
          this.state.isLoading ? <CircularProgress /> :
          <TableContainer component='div'>
            <Table className={styles.table} aria-label="simple table">
              <TableHead classes={{ root: styles['table-head'] }}>
                <TableRow>
                  <TableCell classes={{root: styles['table-cell']}}>Node 名稱</TableCell>
                  <TableCell classes={{root: styles['table-cell']}} align="right">Node 資訊</TableCell>
                  <TableCell classes={{root: styles['table-cell']}} align="right">CPU Pod 最大容量</TableCell>
                  <TableCell classes={{root: styles['table-cell']}} align="right">CPU 核心數量</TableCell>
                  <TableCell classes={{root: styles['table-cell']}} align="right">記憶體大小</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map(node => (
                  <TableRow key={node.node_name}>
                    <TableCell classes={{root: styles['table-cell']}} scope="row">
                      {node.node_name}
                    </TableCell>
                    <TableCell classes={{root: styles['table-cell']}} align="right">{node.node_infp}</TableCell>
                    <TableCell classes={{root: styles['table-cell']}} align="right">{node.cpu_capacity}</TableCell>
                    <TableCell classes={{root: styles['table-cell']}} align="right">{node.cpu_count}</TableCell>
                    <TableCell classes={{root: styles['table-cell']}} align="right">{node.memory_size}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </div>
    )
  }
}

export default SystemInfo
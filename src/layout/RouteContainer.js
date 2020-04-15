import React from 'react'

// react-router-dom
import { Route, Switch } from 'react-router-dom'

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import InboxIcon from '@material-ui/icons/Inbox';

// pages
import Index from '../pages/Index'

// styles
import styles from './RouteContainer.module.scss'

function RouteContainer(props) {

  const routeList = [{
    name: "系統資訊 System Info",
    component: <Index />,
    path: "/",
    icon: <InboxIcon />
  }]

  return (
    <div className={styles.container}>
      <List component="nav" className={styles['route-selector']}>
        {
          routeList.map(route => (
            <ListItem
              button
              selected
              classes={{ root: styles['list-item-root'], selected: styles['list-item-selected'] }}
              key={route.path}
            >
              <ListItemIcon classes={{ root: styles['list-icon']}}>
                { route.icon }
              </ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          ))
        }
      </List>
      <div className={styles['route-container']}>
        <Switch>
          {
            routeList.map(route => (
              <Route exact path={route.path} key={route.path}>
                {route.component}
              </Route>
            ))
          }
        </Switch>
      </div>
    </div>
  )
}

export default RouteContainer
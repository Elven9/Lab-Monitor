import React from 'react'

// Material UI Icon
import InboxIcon from '@material-ui/icons/Inbox';
import AppsIcon from '@material-ui/icons/Apps'

// Page
import Index from './pages/Index'
import Job from './pages/Job'

export default [
  {
    name: "系統資訊 System Info",
    path: "/",
    icon: <InboxIcon />,
    component: <Index />
  }, {
    name: "工作狀態 TFJob Information",
    path: "/job",
    icon: <AppsIcon />,
    component: <Job />
  }
]
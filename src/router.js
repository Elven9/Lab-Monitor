import React from 'react'

// Material UI Icon
import InboxIcon from '@material-ui/icons/Inbox';

// Page
import Index from './pages/Index'

export default [
  {
    name: "系統資訊 System Info",
    path: "/",
    icon: <InboxIcon />,
    component: <Index />
  }
]
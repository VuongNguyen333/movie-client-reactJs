import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { Link } from 'react-router-dom'
import MovieIcon from '@mui/icons-material/Movie'
import BusinessIcon from '@mui/icons-material/Business'
import EventNoteIcon from '@mui/icons-material/EventNote'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
export const mainListItems = (
  <React.Fragment>
    <Link to='/admin'>
      <ListItemButton sx={{ color: 'white' }}>
        <ListItemIcon>
          <DashboardIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton></Link>
    <Link to='/admin/movie'>
      <ListItemButton sx={{ color: 'white' }}>
        <ListItemIcon>
          <MovieIcon sx={{ color: 'white' }} />
        </ListItemIcon>
        <ListItemText primary="Movie Manager" />
      </ListItemButton></Link>
    <Link to='/admin/customers'>
      <ListItemButton sx={{ color:'white' }}>
        <ListItemIcon>
          <PeopleIcon sx={{ color:'white' }}/>
        </ListItemIcon>
        <ListItemText primary="Customers Manager" />
      </ListItemButton>
    </Link>
    <Link to='/admin/branchs'>
      <ListItemButton sx={{ color:'white' }}>
        <ListItemIcon>
          <BusinessIcon sx={{ color:'white' }}/>
        </ListItemIcon>
        <ListItemText primary="Branchs Manager" />
      </ListItemButton>
    </Link>
    <Link to='/admin/add/schedule'>
      <ListItemButton sx={{ color:'white' }}>
        <ListItemIcon>
          <EventNoteIcon sx={{ color:'white' }}/>
        </ListItemIcon>
        <ListItemText primary="Add New Schedule" />
      </ListItemButton>
    </Link>
  </React.Fragment>
)

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset sx={{ bgcolor:'#1a1d29', color:'white' }}>
      Saved reports
    </ListSubheader>
    <ListItemButton sx={{ color:'white' }}>
      <ListItemIcon>
        <AssignmentIcon sx={{ color:'white' }} />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton sx={{ color:'white' }}>
      <ListItemIcon>
        <AssignmentIcon sx={{ color:'white' }} />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton sx={{ color:'white' }}>
      <ListItemIcon>
        <AssignmentIcon sx={{ color:'white' }} />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
    <Link to='/'>
      <ListItemButton sx={{ color:'white' }}>
        <ListItemIcon>
          <KeyboardReturnIcon sx={{ color:'white' }} />
        </ListItemIcon>
        <ListItemText primary="Home Page" />
      </ListItemButton>
    </Link>

  </React.Fragment>
)
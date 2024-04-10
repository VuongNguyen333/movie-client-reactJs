import Box from '@mui/material/Box'
import * as React from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { mainListItems, secondaryListItems } from '~/admin/listItems'
import DashBoard from './Dashboard'
import FilmManager from './FilmManager'
import CustomersManager from './CustomersManager'
import BranchsManager from './BranchsManager'
import SchedulesManager from './ScheduleManager'


const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  })
)

const defaultTheme = createTheme()
function HomeAdmin() {
  const [open, setOpen] = React.useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', bgcolor: '#222831' }}>
        <AppBar position="absolute" open={open} sx={{ bgcolor: '#222831' }}>
          <Toolbar
            sx={{
              pr: '24px' // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} sx={{ bgcolor: '#222831' }}>
          <Toolbar
            sx={{
              bgcolor: '#222831',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: [1]
            }}
          >
            <Box></Box>
            <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Box sx={{ color:'white', alignItems:'center', justifyContent:'center' }}>Admin</Box>
            </Box>
            <IconButton onClick={toggleDrawer} color='white'>
              <ChevronLeftIcon sx={{ color: 'white' }} />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" sx={{ bgcolor: '#1a1d29', height: '100%' }}>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Routes>
          <Route index element={<DashBoard />}></Route>
          <Route path='movie' element={<FilmManager />}></Route>
          <Route path='customers' element={<CustomersManager />}></Route>
          <Route path='branchs' element={<BranchsManager />}></Route>
          <Route path='schedules' element={<SchedulesManager />}></Route>
        </Routes>
        {/* <Box>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/nothing-here">Nothing Here</Link>
              </li>
            </ul>
          </nav>
        </Box> */}
      </Box>
    </ThemeProvider>
  )
}

export default HomeAdmin
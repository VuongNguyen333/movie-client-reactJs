import * as React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'

import { useState } from 'react'
import logo2 from '~/assets/logo2.png'

import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getUserByIdAPI } from '~/apis/userApi'
import { useAuth } from '~/pages/Auth/AuthProvider'

const Navbar = ({ avatar }) => {
  const [photo, setPhoto] = useState(avatar)
  const [user, setUser] = useState({})
  const pages = ['Lịch chiếu', 'Hệ thống rạp']
  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()
  const auth = useAuth()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  useEffect(() => {
    console.log('🚀 ~ Navbar ~ userId:', userId)
    getUserByIdAPI(userId)
      .then(res => {
        setUser(res)
      })
  }, [])

  useEffect(() => {
    setPhoto(avatar)
  }, [avatar])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const [color, setColor] = useState(false)

  const changeColor = () => {
    if (window.scrollY >= 90) {
      setColor(true)
    } else {
      setColor(false)
    }

  }

  window.addEventListener('scroll', changeColor)

  return (
    <div className={color ? 'header header-bg' : 'header'}>
      <nav className='navbar'>
        <a href='/' className='logo' >
          <img style={{ width: '100px', height: '60px' }} src={logo2} alt='logo' />
        </a>
        <Container maxWidth="xl" sx={{ zIndex: 10 }}>
          <Toolbar disableGutters sx={{ pt: '0px', pb: '0px' }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'white' }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none'
              }}
            >
              Cinema
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: 'white', paddingBottom: '0px', paddingTop: '0px' }}
              >
                <MenuIcon sx={{}} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                  paddingBottom: 0,
                  paddingTop: 0
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  paddingTop: 0,
                  paddingBottom: 0,
                  '.MuiList-root': {
                    paddingBottom: 0,
                    paddingTop: 0
                  },
                  '.MuiMenuItem-root:hover': {
                    bgcolor: '#87A922'
                  },
                  borderRadius: '5px'
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{
                      ':hover': {
                        color: '#87A922'
                      },
                      bgcolor: '#222831'
                    }}
                  >
                    <Typography textAlign="center" sx={{ color: 'white' }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'white' }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none'
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', pt: '0px', pb: '0px' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2, color: 'white', display: 'block', '&:hover': {
                      color: '#87A922' // Chuyển màu văn bản sang xanh khi di chuột vào
                    },
                    pt: '0px',
                    pb: '0px'
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              { localStorage.getItem('userRole')?.includes('ROLE_ADMIN')
              && <MenuItem>
                <Link to='/admin'>
                  <Typography textAlign="center" sx={{ color: 'white', mr:'15px' }}>Dashboard</Typography>
                </Link>
              </MenuItem>
              }
              { userId === null ?
                <Link to='/login'>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2, color: 'white', display: 'block', '&:hover': {
                        color: '#87A922' // Chuyển màu văn bản sang xanh khi di chuột vào
                      },
                      pt: '0px',
                      pb: '0px'
                    }}
                  >
                  Login
                  </Button>
                </Link>
                : <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <img style={{ width:50, height:50, borderRadius:'50%' }} alt="Avatar" src={`data:image/jpeg;base64,${photo}`} />
                  </IconButton>
                </Tooltip>
              }

              <Menu
                sx={{}}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    navigate('/profile')
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleCloseUserMenu()
                  auth.handleLogout()
                }} >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </nav>
    </div >
  )
}

export default Navbar
import { Button, Container } from '@mui/material'
import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { getUserByIdAPI } from '~/apis/userApi'
import AppBarCustom from '~/components/AppBar/AppBar'
import Hero from '~/components/Hero/Hero'
import Navbar from '~/components/NavBar/NavBar'
function Profile() {
  const [user, setUser] = useState({})
  const [avatar, setAvatar] = useState('')
  useEffect(() => {
    getUserByIdAPI(localStorage.getItem('userId'))
      .then(res => {
        setUser(res)
        setAvatar(res.avatar)
      })
  }, [])
  return (
    <Container disableGutters maxWidth={false}>
      <Box sx={{ bgcolor:'#1a1d29', color:'white', alignItems:'center', justifyContent:'center' }}>
        <Box>
          <Navbar avatar={user.avatar}/>
          <Hero></Hero>
          <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', typography:'h5', fontWeight:'bold', mb:'30px', mt:'30px' }}>Tai khoan</Box>
          <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Box></Box>
            <Box sx={{ border:'1px solid white', borderRadius:'5px', width:'50%' }}>
              <Box sx={{ display:'flex' }}>
                <Box>
                  <img style={{ width:135, height:135, borderRadius:'50%' }} alt="Avatar" src={`data:image/jpeg;base64,${avatar}`} />
                  <Button />
                </Box>
                <Box sx={{ ml:'30px', color:'#87A922', typography:'h5' }}>{user.fullName}</Box>
              </Box>
              <Box sx={{ border:'2px solid #9BA4B5' }}></Box>
              <Box>Pro</Box>
            </Box>
          </Box>

        </Box>

      </Box>
    </Container>
  )
}

export default Profile
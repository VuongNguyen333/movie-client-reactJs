import Container from '@mui/material/Container'
import Footer from '~/components/Footer'
import NavBar from '~/components/NavBar/NavBar'
import Hero from '~/components/Hero/Hero'
import Content from '~/components/Content/Content'
import { useEffect, useState } from 'react'
import { getUserByIdAPI } from '~/apis/userApi'
function HomePage() {
  const [user, setUser] = useState({})
  useEffect(() => {
    getUserByIdAPI(1).then(res => {
      setUser(res)
    })
  }, [])
  return (
    <Container disableGutters maxWidth={false} >
      <NavBar avatar={user.avatar}></NavBar>
      <Hero></Hero>
      <Content></Content>
      <Footer></Footer>
    </Container >
  )
}

export default HomePage
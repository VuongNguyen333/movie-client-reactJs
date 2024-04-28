import Container from '@mui/material/Container'
import Footer from '~/components/Footer'
import NavBar from '~/components/NavBar/NavBar'
import Hero from '~/components/Hero/Hero'
import Content from '~/components/Content/Content'
import { useEffect, useState } from 'react'
import { getUserByIdAPI } from '~/apis/userApi'
import { useNavigate } from 'react-router-dom'
function HomePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      setUser(null)
    } else {
      getUserByIdAPI(localStorage.getItem('userId')).then(res => {
        setUser(res)
      })
    }
  }, [])
  return (
    <Container disableGutters maxWidth={false} >
      <NavBar avatar={user?.avatar}></NavBar>
      <Hero></Hero>
      <Content></Content>
      <Footer></Footer>
    </Container >
  )
}

export default HomePage
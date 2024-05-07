import Container from '@mui/material/Container'
import Footer from '~/components/Footer'
import NavBar from '~/components/NavBar/NavBar'
import Hero from '~/components/Hero/Hero'
import Content from '~/components/Content/Content'
import SliderConponent from '~/components/Slider/SliderComponent'
import { useEffect, useState } from 'react'
import { getUserByIdAPI } from '~/apis/userApi'
import { useNavigate } from 'react-router-dom'
import image1 from '~/assets/img7.jpg'
import image2 from '~/assets/img8.jpg'
// import image3 from '~/assets/img5.jpg'
import image3 from '~/assets/img6.jpg'
import image4 from '~/assets/img9.jpg'
import image5 from '~/assets/img10.jpg'
import { Box } from '@mui/material'
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
    <Container disableGutters maxWidth={false} sx={{ bgcolor: '#1a1d29' }}>
      <NavBar avatar={user?.avatar}></NavBar>
      <Box sx={{ alignItems:'center', height:'100vh', justifyContent:'center', display:'flex' }}>
        <Box sx={{ width:'100%', alignItems:'center', justifyContent:'center' }}>
          <Box sx={{ height:'100%', alignItems:'center', justifyContent:'center' }}>
            <SliderConponent arrImage={[image1, image2, image3, image4, image5]}/>
          </Box>
        </Box>
      </Box>
      <Content></Content>
      <Footer></Footer>
    </Container >
  )
}

export default HomePage
import Container from '@mui/material/Container'
import Footer from '~/components/Footer'
import NavBar from '~/components/NavBar/NavBar'
import Hero from '~/components/Hero/Hero'
import Content from '~/components/Content/Content'
function HomePage() {
  return (
    <Container disableGutters maxWidth={false} >
      <NavBar></NavBar>
      <Hero></Hero>
      <Content></Content>
      <Footer></Footer>
    </Container >
  )
}

{/*  */ }
export default HomePage
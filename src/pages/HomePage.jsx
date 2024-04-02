import Container from '@mui/material/Container'
import Footer from '~/components/Footer'
import AppBar from '~/components/Appbar/AppBar'
import Hero from '~/components/Hero/Hero'
import Content from '~/components/Content/Content'
function HomePage() {
  return (
    <Container disableGutters maxWidth={false} >
      <AppBar></AppBar>
      <Hero></Hero>
      <Content></Content>
      <Footer></Footer>
    </Container >
  )
}

{/*  */}
export default HomePage
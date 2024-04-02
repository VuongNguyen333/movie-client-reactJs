import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Footer from '~/components/Footer'
import AppBar from '~/components/Appbar/AppBar'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ArrowBackIos from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos'
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
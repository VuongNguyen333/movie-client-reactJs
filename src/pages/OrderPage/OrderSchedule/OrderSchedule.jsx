/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea, Typography } from '@mui/material'
import { productData, areas } from '~/mock_data'
import ListBranchs from './ListTheaters/ListBranchs'

export default function OrderSchedule({ orderSchedule }) {
  const { filmId, filmName } = useParams()
  const [film, setFilm] = useState({})

  useEffect(() => {
    // call api get Film
    productData.forEach(item => {
      if (item.id.toString() === filmId.toString()) {
        setFilm(item)
        console.log(1);
      }
    })
  }, [filmId])
  const [showFilmList, setShowFilmList] = useState(false)

  const [areaId, setAreaId] = React.useState('1')

  const handleChangeArea = (event, newValue) => {
    setAreaId(newValue)
  }

  return (
    <div style={{ overflow: 'auto', width: '100%' }}>
      <Box>
        <h1 style={{ color: 'white' }}>{filmName.toUpperCase()}</h1>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', overflow: 'auto' }}>
        <Box></Box>
        <Box sx={{ alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
          <Card sx={{ maxWidth: 250, mb:'5px' }}>
            <CardActionArea>
              <CardMedia
                component="img"
                width='100px'
                height="300px"
                image={`data:image/jpeg;base64,${film?.photo}`}
                alt={filmName}
              />
            </CardActionArea>
          </Card>
          <Box sx={{ alignItems:'center', justifyContent:'center', border:'1px solid white', p:'5px', borderRadius:'10px', maxWidth:300 }} >
            <Box sx={{ alignItems:'center', justifyContent:'center', border:'1px solid white', p:'5px', borderRadius:'10px', color:'white' }}>
              <Box sx={{ alignItems:'center', justifyContent:'center', typography:'h5', borderBottom:'1px solid white', color:'#16FF00', width:'100%' }} >{filmName}</Box>
              <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Thời lượng:{<Typography sx={{ color:'white', fontSize:18 }}>{film?.duration} phút</Typography>}</Box>
              <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Ngôn ngữ:{<Typography sx={{ color:'white', fontSize:18 }}>{film?.language}</Typography>}</Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ typography: 'body1', alignItems: 'center', justifyContent: 'center', width: '60%' }}>
          <Box sx={{ typography: 'body1', alignItems: 'center', justifyContent: 'center' }}>
            <TabContext value={areaId}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', overflowX: 'auto' }}>
                <TabList
                  variant="scrollable"
                  onChange={handleChangeArea}
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="lab API tabs example"
                  sx={{
                    '.MuiTabs-indicator': { bgcolor: '#16FF00' },
                    '& .MuiSvgIcon-root': { color: '#fff' },
                    overflowX:'auto'
                  }}
                >
                  {areas.map((item, index) =>
                    <Tab
                      sx={{
                        color: 'white',
                        '&.Mui-selected': { color: '#16FF00' },
                      }}
                      key={index}
                      label={`${item.name}`}
                      value={item.id.toString()}
                    />
                  )}
                </TabList>
              </Box>
              <TabPanel sx={{ alignItems: 'center', justifyContent: 'center', color: 'white', maxWidth: '100%', display: 'flex' }} value={`${areaId}`}>
                <ListBranchs area_id={areaId} orderSchedule={orderSchedule}/>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </div>


  )
}
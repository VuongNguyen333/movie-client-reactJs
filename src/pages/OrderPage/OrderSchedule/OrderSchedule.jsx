/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import { productData, areas } from '~/mock_data'
import ListBranchs from './ListTheaters/ListBranchs'

export default function OrderSchedule({ orderSchedule }) {
  const { filmId, filmName } = useParams()
  let film = {}
  productData.forEach(item => {
    if (item.id.toString() === filmId.toString()) {
      film = item
    }
  })
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
        <Box sx={{ alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                width='200'
                height="500px"
                image={`data:image/jpeg;base64,${film.photo}`}
                alt={filmName}
              />
            </CardActionArea>
          </Card>
          <Box sx={{ maxWidth: 500, color: 'white' }}>
            {film.description}
          </Box>
        </Box>
        <Box sx={{ typography: 'body1', alignItems: 'center', justifyContent: 'center', width: '60%' }}>
          <Box sx={{ typography: 'body1', alignItems: 'center', justifyContent: 'center' }}>
            <TabContext value={areaId} >
              <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
                <TabList
                  variant="scrollable"
                  onChange={handleChangeArea}
                  aria-label="lab API tabs example"
                  sx={{
                    '.MuiTabs-indicator': { bgcolor: '#16FF00' },
                    '& .MuiSvgIcon-root': { color: '#fff' }
                  }}
                >
                  {areas.map((item, index) =>
                    <Tab
                      sx={{
                        color: 'white',
                        '&.Mui-selected': { color: '#16FF00' }
                      }}
                      key={index}
                      label={`${item.name}`}
                      value={item.id.toString()}
                    />
                  )}
                </TabList>
              </Box>
              <TabPanel sx={{ alignItems: 'center', justifyContent: 'center', color: 'white', maxWidth: '100%', display: 'flex' }} value={`${areaId}`}>
                <ListBranchs area_id={areaId} orderSchedule={orderSchedule} show={showFilmList}/>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </div>


  )
}
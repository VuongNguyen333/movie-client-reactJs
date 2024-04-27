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
import { CardActionArea, CircularProgress, Typography } from '@mui/material'
import ListBranchs from './ListTheaters/ListBranchs'
import { getMovieByIdAPI } from '~/apis/movieApi'
import { getListAreaAPI } from '~/apis/areaApi'
import NotfoundPage from '~/pages/NotfoundPage'

export default function OrderSchedule({ orderSchedule }) {
  const { filmId } = useParams()
  const [filmName, setFilmName] = useState('')
  const [film, setFilm] = useState({})
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    // call api get Film
    getMovieByIdAPI(filmId).then(res => {
      setFilm(res)
      setFilmName(res?.name)
    }).finally(setLoading(false))
    getListAreaAPI().then(res => {
      setAreas(res)
    })
  }, [filmId])

  const [areaId, setAreaId] = React.useState('1')

  const handleChangeArea = (event, newValue) => {
    setAreaId(newValue)
  }

  return (
    loading ? ( <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
    }}>
      <CircularProgress />
      <Typography>Loading data...</Typography>
    </Box>) : (
      !film ? ( <NotfoundPage />)
        : (
          <div style={{ overflow: 'auto', width: '100%' }}>
            <Box sx={{ display:'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h2 style={{ color: 'white', alignItems:'center' }}>{filmName?.toUpperCase()}</h2>
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
                <Box sx={{ alignItems:'center', justifyContent:'center', border:'1px solid white', p:'5px', borderRadius:'10px', maxWidth:350 }} >
                  <Box sx={{ alignItems:'center', justifyContent:'center', border:'1px solid white', p:'5px', borderRadius:'10px', color:'white' }}>
                    <Box sx={{ alignItems:'center', justifyContent:'center', typography:'h6', borderBottom:'1px solid white', color:'#16FF00', width:'100%', maxWidth:300 }} >{filmName.toString()}</Box>
                    <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:16, mb:'8px' }}>Thời lượng:{<Typography sx={{ color:'white', fontSize:16 }}>{film?.duration} phút</Typography>}</Box>
                    <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:16, mb:'8px' }}>Ngôn ngữ:{<Typography sx={{ color:'white', fontSize:16 }}>{film?.language}</Typography>}</Box>
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
                        {areas?.map((item, index) =>
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
                      <ListBranchs area_id={areaId} orderSchedule={orderSchedule} movieId={filmId}/>
                    </TabPanel>
                  </TabContext>
                </Box>
              </Box>
            </Box>
          </div>
        )
    )
  )
}
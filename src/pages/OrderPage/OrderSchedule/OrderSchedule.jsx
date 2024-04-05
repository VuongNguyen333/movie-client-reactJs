import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import { branchs, productData } from '~/mock_data'
import ListTheaters from './ListTheaters/ListTheaters'

export default function OrderSchedule() {
  const { filmId, filmName } = useParams()
  let film = {}
  productData.forEach(item => {
    if (item.id.toString() === filmId.toString()) {
      film = item
    }
  })
  const [showFilmList, setShowFilmList] = useState(false);

  const [branch, setbranch] = React.useState('1')

  const handleChangeBranch = (event, newValue) => {
    setbranch(newValue)
  }

  return (
    <div style={{ overflow: 'auto', width: '100%' }}>
      <Box>
        <h1 style={{ color: 'white' }}>{filmName}</h1>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                width='200'
                height="400px"
                image={film.imageurl}
                alt={filmName}
              />
              <Box>{filmName}</Box>
            </CardActionArea>
          </Card>
          <Box sx={{ maxWidth: 500, color: 'white' }}>
            {film.description}
          </Box>
        </Box>
        <Box sx={{ typography: 'body1', alignItems: 'center', justifyContent: 'center', width: '90%' }}>
          <Box sx={{ typography: 'body1', alignItems: 'center', justifyContent: 'center' }}>
            <TabContext value={branch} >
              <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <TabList onChange={handleChangeBranch} aria-label="lab API tabs example">
                  {branchs.map((item, index) =>
                    <Tab sx={{ color: 'white' }} key={index} label={`${item.name}`} value={item.branch_id.toString()} />
                  )}
                </TabList>
              </Box>
              <TabPanel sx={{ alignItems: 'center', justifyContent: 'center', color: 'white', maxWidth: '100%', display: 'flex' }} value={`${branch}`}>
                <ListTheaters branchId={branch} show={showFilmList}/>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>

    </div>


  )
}
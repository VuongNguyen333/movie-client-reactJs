import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'
import Tabs, { tabsClasses } from '@mui/material/Tabs'
import { schedules, branchs, theaters, productData } from '~/mock_data'

export default function OrderSchedule() {
  const { filmId, filmName } = useParams()
  const film = {}
  productData.forEach(item => {
    if (item.id.toString() === filmId.toString()) {
      film.imageurl = item.imageurl
    }
  })
  const [branch, setbranch] = React.useState('1')
  const [theaterId, setTheaterId] = React.useState(1)

  const [scheduleId, setScheduleId] = React.useState(1)

  const handleChangeScheduleId = (event, newValue) => {
    setScheduleId(newValue)
  }

  const handleChangeBranch = (event, newValue) => {
    setbranch(newValue)
  }
  const [openTheater, setOpenTheater] = useState(Array(theaters.length).fill(false))
  const [openSchedule, setOpenSchedule] = useState(Array(schedules.length).fill(false))

  const handleClickTheater = (index) => {
    setTheaterId(theaters[index].theater_id)
    setOpenSchedule(index)
    setOpenTheater(prevState => {
      const newState = [...prevState]
      newState[index] = !newState[index]
      return newState
    })
  }


  return (
    <div style={{ overflow: 'auto' }}>
      <Box>
        <h1 style={{ color: 'white' }}>{filmName}</h1>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ alignItems: 'center', justifyContent: 'center', marginLeft: '50px' }}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                width='200'
                height="350px"
                image={film.imageurl}
                alt={filmName}
              />
              <Box>{filmName}</Box>
            </CardActionArea>
          </Card>
        </Box>
        <Box sx={{ typography: 'body1', alignItems: 'center', justifyContent: 'center', marginRight: '90px' }}>
          <TabContext value={branch}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
              <TabList onChange={handleChangeBranch} aria-label="lab API tabs example">
                {branchs.map((branch, index) =>
                  <Tab sx={{ color: 'white' }} key={index} label={`${branch.name}`} value={branch.branch_id.toString()} />
                )}
              </TabList>
            </Box>
            {branchs.map((item, index1) => {
              if (item.branch_id.toString() === branch.toString()) {
                return <TabPanel key={index1} sx={{ alignItems: 'center', justifyContent: 'center', color: 'white', maxWidth: '100%' }} value={`${branch}`}>
                  {theaters.map((theater, index) => {
                    if (theater.branch_id.toString() === branch.toString())
                      return
                    <ListItemButton
                      key={index}
                      onClick={() => handleClickTheater(index)} // Truyền index cho handleClick
                      sx={{ color: 'white', borderTop: '2px solid #fff', borderBottom: '2px solid #fff' }}
                    >
                      <ListItemIcon color='white'>
                        <InboxIcon sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText primary={theater.name} />
                      {openTheater[index] ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                  })}
                  <Collapse in={openTheater[openSchedule]} timeout="auto" unmountOnExit>
                    <Box
                      sx={{
                        flexGrow: 1,
                        maxWidth: { xs: 320, sm: 480 },
                        bgcolor: '#1a1d29'
                      }}
                    >
                      <Tabs
                        // value={branch}
                        onChange={handleChangeScheduleId}
                        variant="scrollable"
                        scrollButtons
                        aria-label="visible arrows tabs example"
                        sx={{
                          [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 }
                          },
                          color: 'white'
                        }}
                      >
                        {schedules.map(schedule => {
                          if (schedule.theater_id.toString() === theaterId.toString())
                            return <Tab key={schedule.schedule_id} sx={{ color: 'white' }} label={`${schedule.start_time}`} />
                        })}
                      </Tabs>
                    </Box>
                  </Collapse>
                </TabPanel>
              }
            })}
          </TabContext>
        </Box>
      </Box>

    </div>


  )
}
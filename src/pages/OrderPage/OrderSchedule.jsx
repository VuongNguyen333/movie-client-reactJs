import React from 'react'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
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
import List from '@mui/material/List'
import Collapse from '@mui/material/Collapse'
import StarBorder from '@mui/icons-material/StarBorder'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { schedules, branchs, theaters, productData } from '~/mock_data'

export default function OrderSchedule() {
  const { filmId, filmName } = useParams()
  const film = {}
  productData.forEach(item => {
    if (item.id.toString() === filmId.toString()) {
      film.imageurl = item.imageurl
      console.log('🚀 ~ OrderSchedule ~ film:', film)
    }
  })
  const [value, setValue] = React.useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }


  return (
    <div>
      <Box>
        <h1 style={{ color: 'white',  }}>{filmName}</h1>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
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
        <Box sx={{ typography: 'body1', alignItems: 'center', justifyContent: 'center' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                {branchs.map((branch, index) =>
                  <Tab key={index} label={`${branch.name}`} value={branch.branch_id.toString()}/>
                )}
              </TabList>
            </Box>
            <TabPanel sx={{ alignItems: 'center', justifyContent: 'center' }} value='1'>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </List>
              </Collapse>
            </TabPanel>
            <TabPanel sx={{ alignItems: 'center', justifyContent: 'center' }} value='2'>Item Two</TabPanel>
            <TabPanel sx={{ alignItems: 'center', justifyContent: 'center' }} value='3'>Item Three</TabPanel>
          </TabContext>
        </Box>
      </Box>

    </div>


  )
}
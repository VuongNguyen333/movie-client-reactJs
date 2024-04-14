import React, { useEffect, useState } from 'react'
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2'
import { schedules, rooms } from '~/mock_data'
import { useParams } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { Box, Typography } from '@mui/material'

const CustomTreeItem = React.forwardRef((props, ref) => (
  <TreeItem2
    ref={ref}
    {...props}
    slotProps={{
      label: {
        id: `${props.itemId}-label`
      }
    }}
    sx={{
      '.MuiTreeItem-content': { color: 'white' },
      '&:hover .MuiTreeItem-content': { color: '#87A922' },
      '& .MuiTreeItem2-content': {
        '&.Mui-selected': { bgcolor: 'green' }
      },
      '& .Mui-selected': { bgcolor: 'green' }
    }}
  />
))

export default function ListSchedule({ orderSchedule, branchId }) {

  const [listSchedules, setListSchedules] = useState([])
  useEffect(() => {
    const listRoomOfBranch = ([...rooms].filter(item => item.branchResponse.id.toString() === branchId.toString()))
    console.log('🚀 ~ useEffect ~ listRoomOfBranch:', listRoomOfBranch)
    let listSchedules1 = []
    listRoomOfBranch.map(item => {
      [...schedules].map(item1 => {
        if (item.id.toString() === item1.roomResponse.id.toString()) {
          listSchedules1.push(item1)
        }
      })
    })
    // console.log('🚀 ~ useEffect ~ listSchedules1:', listSchedules1)
    setListSchedules(listSchedules1)
  }, [branchId])
  const { filmId } = useParams()

  // if (listSchedules.length === 0 ) {
  //   return (
  //     <Box sx={{
  //       display: 'flex',
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //       gap: 2
  //     }}>
  //       <CircularProgress />
  //       <Typography>Loading data...</Typography>
  //     </Box>
  //   )
  // }

  return (
    <>
      {listSchedules?.map((item, index) =>
        <CustomTreeItem
          key={`schedule${index}`}
          itemId={`schedule${item.id}`}
          label={item.startTime.toString() + ' ' + item.startDate}
          onClick={() => orderSchedule(branchId, item.id, filmId)}
        />)
      }
    </>
  )
}
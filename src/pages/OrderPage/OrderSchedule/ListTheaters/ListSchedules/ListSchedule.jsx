import React from 'react'
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2'
import { schedules, rooms } from '~/mock_data'
import { useParams } from 'react-router-dom'

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
  const listRoomOfBranch = [...rooms].filter(item => item.branch_id.toString() === branchId.toString())
  let listSchedules = []
  listRoomOfBranch.map(item => {
    [...schedules].map(item1 => {
      if (item.roomId.toString() === item1.roomId.toString()) {
        listSchedules.push(item1)
      }
    })
  })
  // console.log('🚀 ~ ListSchedule ~ listSchedules:', listSchedules)

  const { filmId } = useParams()
  return (
    <>
      {listSchedules.map((item, index) =>
        <CustomTreeItem

          key={index}
          itemId={`schedule${item.schedule_id}`}
          label={item.start_time}
          onClick={() => orderSchedule(branchId, item.schedule_id, filmId)}
        />)
      }
    </>
  )
}
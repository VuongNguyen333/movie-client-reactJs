import React, { useEffect, useState } from 'react'
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2'
import { useParams } from 'react-router-dom'
import { getListScheduleByBranchIdAndMovieIdAPI } from '~/apis/scheduleApi'

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
  const { filmId } = useParams()
  const [listSchedules, setListSchedules] = useState([])
  useEffect(() => {
    getListScheduleByBranchIdAndMovieIdAPI(branchId, filmId).then(res => {
      setListSchedules(res)
    })
  }, [branchId, filmId])

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
import React, { useEffect, useState } from 'react'
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2'
import { useParams } from 'react-router-dom'
import { getListScheduleByBranchIdAndMovieIdAPI } from '~/apis/scheduleApi'
import { Box, CircularProgress, Typography } from '@mui/material'

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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true) // Bắt đầu tải dữ liệu
    getListScheduleByBranchIdAndMovieIdAPI(branchId, filmId)
      .then(res => {
        setListSchedules(res)
      })
      .finally(() => {
        setLoading(false) // Kết thúc tải dữ liệu
      })
  }, [branchId, filmId])

  return (
    <>
      {loading ? (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}>
          <CircularProgress />
          <Typography>Loading data...</Typography>
        </Box>
      ) : (
        <>
          {listSchedules.length === 0 ? (
            <Typography>No schedule available</Typography>
          ) : (
            listSchedules?.map((item, index) =>
              <CustomTreeItem
                key={`schedule${index}`}
                itemId={`schedule${item.id}`}
                label={item.startTime.toString() + ' ' + item.startDate + ' ' + item.roomResponse.name}
                onClick={() => orderSchedule(branchId, item.id, filmId)}
              />)

          )}
        </>
      )}
    </>
  )
}
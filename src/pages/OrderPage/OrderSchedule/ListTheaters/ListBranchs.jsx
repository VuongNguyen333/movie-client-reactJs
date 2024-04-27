import React, { useEffect, useState } from 'react'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2'
import Box from '@mui/material/Box'
import ListSchedule from './ListSchedules/ListSchedule'
import { getListBranchByAreaIdAPI, getListBranchClientAPI } from '~/apis/branchApi'
import { CircularProgress, Typography } from '@mui/material'

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
      borderBottom: '1px solid white',
      borderTop: '1px solid white',
      '&.Mui-focused &.MuiTreeItem2-content.Mui-selected' : { bgcolor: 'green' }
      ,
      '&.MuiTreeItem2-content': { bgcolor: 'green' }
    }}
  />
))

function ListBranchs({ area_id, orderSchedule, movieId }) {
  const [listBranchs, setListBranchs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // call api
    setLoading(true)
    getListBranchClientAPI(movieId, area_id)
      .then(res => {
        setListBranchs(res)
      })
      .finally(() =>
        setLoading(false)
      )
  }, [area_id])

  return (
    <SimpleTreeView
      aria-label="customized"
      // defaultExpandedItems={['pickers']}
      sx={{
        minHeight: 224,
        flexGrow: 1,
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiTreeItem-content' : {
          '.Mui-selected' : { bgcolor: 'green' }
        }
      }}
    >
      <Box sx={{
        minHeight: 224,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiTreeItem-content' : {
          '.Mui-selected' : { bgcolor: 'green' }
        }
      }}>
        { loading
          ? (
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}>
              <CircularProgress />
              <Typography>Loading data...</Typography>
            </Box>
          )
          : (
            listBranchs?.length === 0
              ? <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Typography sx={{ alignItems:'center', justifyContent:'center' }}>No schedule available</Typography>
              </Box>
              : listBranchs?.map((item, index) =>
                <CustomTreeItem key={`branch${index}`} itemId={`branch${item?.id}`} label={item?.name}>
                  <ListSchedule orderSchedule={orderSchedule} branchId={item?.id} />
                </CustomTreeItem>)
          )
        }
      </Box>
    </SimpleTreeView>
  )
}

export default ListBranchs
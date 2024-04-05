import React from 'react'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2'
import { theaters } from '~/mock_data'
import Box from '@mui/material/Box'
import ListSchedule from './ListSchedules/ListSchedule'

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
      borderTop: '1px solid white'
    }}
  />
))

function ListTheaters({ branchId }) {
  const listTheaters = [...theaters].filter(item => item.branch_id.toString() === branchId.toString())
  return (
    <SimpleTreeView
      aria-label="customized"
      defaultExpandedItems={['pickers']}
      sx={{
        overflowX: 'hidden',
        minHeight: 224,
        flexGrow: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box sx={{
        overflowX: 'hidden',
        minHeight: 224,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {listTheaters.map((item, index) =>
        <CustomTreeItem key={index} itemId={item.theater_id} label={item.name}>
          <ListSchedule theaterId = {item.theater_id}/>
        </CustomTreeItem>)}
      </Box>
      
    </SimpleTreeView>
  )
}

export default ListTheaters
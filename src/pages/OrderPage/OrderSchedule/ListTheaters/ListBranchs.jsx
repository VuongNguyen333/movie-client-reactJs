import React from 'react'
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView'
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2'
import { rooms, branchs } from '~/mock_data'
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

function ListBranchs({ area_id, orderSchedule }) {
  const listBranchs = [...branchs].filter(item => item.area_id.toString() === area_id.toString())
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
        justifyContent: 'center'
      }}
    >
      <Box sx={{
        minHeight: 224,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {listBranchs.map((item, index) =>
          <CustomTreeItem key={index} itemId={`branch${item.branch_id}`} label={item.name}>
            <ListSchedule orderSchedule={orderSchedule} branchId={item.branch_id}/>
          </CustomTreeItem>)}
      </Box>

    </SimpleTreeView>
  )
}

export default ListBranchs
import React from 'react'
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2'
import { schedules } from '~/mock_data'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CustomTreeItem = React.forwardRef((props, ref) => (
  <TreeItem2
    ref={ref}
    {...props}
    slotProps={{
      label: {
        id: `${props.itemId}-label`
      }
    }}
  />
))

export default function ListSchedule({ theaterId }) {
  const listSchedules = [...schedules].filter(item => item.theater_id.toString() === theaterId.toString())
  return (
    <>
      {listSchedules.map((item, index) => <CustomTreeItem key={index} itemId={`${item.schedule_id}`} label={item.start_time} />)}
    </>
  )
}
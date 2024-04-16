/* eslint-disable no-console */
import Box from '@mui/material/Box'
import { productData } from '~/mock_data'
import Toolbar from '@mui/material/Toolbar'
import DataTable from '../components/DataTable'
import ViewAndUpdateButton from '../components/ViewAndUpdateButton'
import AddNewForm from '../components/AddNewFilmForm'
import ViewAndUpdateButtonFilm from '../components/ViewAndUpdateButtonFIlm'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200, editable: true },
  {
    field: 'actor',
    headerName: 'Actor',
    type: 'array',
    width: 100,
    editable: true
  },
  { field: 'director', headerName: 'Director', width: 100, editable: true },
  { field: 'language', headerName: 'Language', width: 100, editable: true },
  { field: 'category', headerName: 'Category', width: 100, editable: true },
  { field: 'releaseDate', headerName: 'ReleaseDate', width: 100, editable: true },
  { field: 'duration', headerName: 'Duration (minute)', width: 200, editable: true },
  {
    field: 'button',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => {
      return (
        <ViewAndUpdateButtonFilm params={params}/>
      )
    },
    disableColumnMenu: true,
    sortable: false
  }
]
function FilmManager() {
  return (
    <Box
      component="main"
      sx={{
        // display:'flex',
        color: 'black',
        bgcolor: 'white',
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
      <Toolbar />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box typography='h4' sx={{ alignItems: 'center', justifyContent: 'center' }}>LIST FILM</Box>
      </Box>
      <AddNewForm />
      <DataTable rows={productData} columns={columns} />
    </Box>
  )
}

export default FilmManager
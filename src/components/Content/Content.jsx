import Box from '@mui/material/Box'
import ListFilm from '../ListFilm/ListFilm'
import { productData, productDataComming } from '~/mock_data'

function Content() {
  return (
    <Box sx={{ bgcolor: '#1a1d29' }}>
      <Box sx={{ color:'#1a1d29' }}>1</Box>
      <ListFilm productData={productData} ></ListFilm>
      <div style={{ borderBottom: '5px solid rgba(255, 255, 255, 0.1)', marginTop: '30px' }}></div>
      <ListFilm productData={productDataComming} ></ListFilm>
      <div style={{ borderBottom: '5px solid rgba(255, 255, 255, 0.1)', marginTop: '30px' }}></div>
    </Box>
  )
}

export default Content
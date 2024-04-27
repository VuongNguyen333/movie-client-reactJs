import Box from '@mui/material/Box'
import ListFilm from '../ListFilm/ListFilm'
import { useEffect, useState } from 'react'
import { getMovieAPI, getMovieUpComingAPI } from '~/apis/movieApi'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

function Content() {

  const [listFilm, setListFilm] = useState([])
  const [listFilmComing, setListFilmComing] = useState([])
  const [loading1, setLoading1] = useState(true)
  const [loading2, setLoading2] = useState(true)
  useEffect(() => {
    setLoading1(true)
    setLoading2(true)
    getMovieAPI()
      .then(res => {
        setListFilm(res)
      })
      .finally(() => setLoading1(false))
    getMovieUpComingAPI()
      .then(res => setListFilmComing(res))
      .finally(() => setLoading2(false))
  }, [])
  return (
    <Box sx={{ bgcolor: '#1a1d29' }}>
      <Box sx={{ color:'#1a1d29' }}>1</Box>
      { loading1
        ? <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}>
          <CircularProgress />
          <Typography sx={{ color:'white' }}>Loading data...</Typography>
        </Box>
        : <ListFilm productData={listFilm} type=''></ListFilm>
      }
      <div style={{ borderBottom: '5px solid rgba(255, 255, 255, 0.1)', marginTop: '30px' }}></div>
      { loading2
        ? <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2
        }}>
          <CircularProgress />
          <Typography sx={{ color:'white' }}>Loading data...</Typography>
        </Box>
        : <ListFilm productData={listFilmComing} type='coming'></ListFilm>
      }
      <div style={{ borderBottom: '5px solid rgba(255, 255, 255, 0.1)', marginTop: '30px' }}></div>
    </Box>
  )
}

export default Content
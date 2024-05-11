import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Container from '@mui/material/Container'
import Footer from '~/components/Footer'
import Navbar from '~/components/NavBar/NavBar'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUserByIdAPI } from '~/apis/userApi'
import { getListAreaAPI } from '~/apis/areaApi'
import { getListBranchByAreaIdAPI } from '~/apis/branchApi'
import BranchDetail from '~/components/BranchDetail'

function BranchSystem() {

  const [listBranch, setListBranch] = useState([])
  const [listArea, setListArea] = useState([])
  const [areaId, setAreaId] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleChange = (event) => {
    setAreaId(event.target.value)
  }
  // const classes = useStyles();

  const [user, setUser] = useState({})

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      setUser(null)
    } else {
      if (localStorage.getItem('user')) {
        const userLocal = JSON.parse(localStorage.getItem('user'))
        setUser(userLocal)
      } else {
        getUserByIdAPI(localStorage.getItem('userId')).then(res => {
          setUser(res)
        })
      }
    }
    getListAreaAPI().then(res => {
      setListArea(res)
      setAreaId(res[0].id)
    })
  }, [])
  useEffect(() => {
    setLoading(true)
    getListBranchByAreaIdAPI(areaId).then(res => {
      // console.log('🚀 ~ getListBranchByAreaIdAPI ~ res:', res)
      setListBranch(res)
    }).finally(() => setLoading(false))
  }, [areaId])
  return (
    <Container maxWidth={false} sx={{ bgcolor:'#222831', height:'100vh' }} disableGutters >
      <Container disableGutters maxWidth={false} sx={{ bgcolor: '#1a1d29' }}>
        <Navbar avatar={user?.avatar}/>
        <Box sx={{ color: '#1a1d29' }}>1</Box>
        <Box sx={{ color: '#1a1d29' }}>1</Box>
        <Box sx={{ color: '#1a1d29' }}>1</Box>
        <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center', typography:'h4', fontWeight:'bold', color: 'white' }}>Hệ thống rạp</Box>
        <Box sx={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', mb:'30px' }}>
          <Box sx={{ alignItems:'center', justifyContent:'center', width:'fit-content' }}>
            <FormControl
              variant="standard"
              InputLabelProps={{ shrink: true }}
              sx={{
                m: 1,
                minWidth: 120,
                color:'white',
                '&.MuiFormControl-root': {
                  borderRadius: '8px' // Bo tròn các góc
                },
                '& .MuiInputBase-root': {
                  color: 'white'
                },
                '& .MuiInputBase-input': {
                  caretColor: 'white' // Màu con trỏ của input
                },
                '& .MuiInputLabel-root': {
                  color: 'white'
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: 'rgba(255, 255, 255, 0.7)' // Màu của đường underline khi không focus
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: 'white' // Màu của đường underline khi focus
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: 'rgba(255, 255, 255, 0.7)' // Màu của đường underline khi hover
                },
                '& .MuiSvgIcon-root': {
                  color: 'white'
                }
              }}
            >
              <InputLabel shrink={true} id="demo-simple-select-standard-label" sx={{ color:'white' }} >Khu vực</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={areaId}
                autoFocus
                onChange={handleChange}
                label="Khu vực"
                sx={{
                  color:'white',
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  },
                  '& .MuiInputLabel-root': {
                    shrink: 'true',
                    color: 'white',
                    '&.Mui-focused': {
                      color: 'white' // Màu label khi focus
                    }
                  },
                  '& .MuiInputBase-root': {
                    color: 'white'
                  }
                }}
                inputProps = {{ sx : { color:'white' } }}
              >
                { listArea.map(item => {
                  return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                }) }
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Box sx={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <Box sx={{ alignItems:'center', justifyContent:'center', width:'90%' }}>
            <Box sx={{ flexGrow: 1, width:'100%', alignItems:'center', justifyContent:'center' }}>
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 9, md: 12 }}>
                { loading
                  ? <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2
                  }}>
                    <CircularProgress />
                    <Typography sx={{ color:'white' }}>Loading data...</Typography>
                  </Box>
                  : (listBranch?.map((item1, index) => (
                    <Grid item xs={2} sm={3} md={3} key={`Branch${item1.index}`}>
                      <BranchDetail
                        key={`ITEM${item1.index}`}
                        branch = {item1}
                      />
                    </Grid>
                  )))
                }
              </Grid>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Container>
    </Container>
  )
}

export default BranchSystem
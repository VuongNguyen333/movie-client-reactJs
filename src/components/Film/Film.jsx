import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import InfoIcon from '@mui/icons-material/Info'
import Typography from '@mui/material/Typography'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import './Film.css'
import { useNavigate } from 'react-router-dom'
export default function Film(props) {
  const navigate = useNavigate()
  const handleOpen = (movie) => {
    setSelectedMovie(movie)
    setOpen(true)
  }

  const [selectedMovie, setSelectedMovie] = React.useState(null)

  const handleClose = () => {
    setSelectedMovie(null)
    setOpen(false)
  }
  const [open, setOpen] = React.useState(false)

  const style = {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 'fit-content',
    minWidth: '70%',
    outline: 0,
    bgcolor: '#1A1A1A',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
    px: 2,
    gap: 2,
    overflowX: 'auto',
    alignItems: 'center',
    justifyContent:'center',
    maxHeight: '90%'
  }

  const modalStyle = {
    // width: '90%',
    maxWidth: '400px', // Giới hạn kích thước modal tối đa
    margin: 'auto',
    borderRadius: '10px',
    // alignItems: 'center',
    overFlow: 'hidden'
  }
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <>
      <div className="card">
        <img style={{ cursor: 'pointer' }} onClick={() => handleOpen(props)} className="product--image" src={props.photo} alt="product image" />
        <div
          onClick={() => handleOpen(props)}
          className="truncate-text"
          title={props.name.toUpperCase()}
          style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer', width: 'fit-content', ':hover': { color: 'red' } }}
        >
          {props.name.toUpperCase()}
        </div>
        <p>
          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Box >
              <Button
                startIcon={<ConfirmationNumberIcon fontSize='medium' />}
                onClick={() => {
                  navigate(`/order/${props.id}`)
                }
                }>Đặt vé</Button>
            </Box>
            <Box
              sx={{
                ml: '10px',
                width: '45px',
                height: '45px',
                bgcolor: '#222831',
                borderRadius: '5px',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                border: '2px solid #87A922',
                cursor: 'pointer',
                ':hover': {
                  bgcolor: '#72b343'
                }
              }}
              onClick={() => handleOpen(props)}
            >
              <InfoIcon sx={{ display: 'flex', alignItems: 'center', color: 'white' }} />
            </Box>
          </Box>
        </p>
      </div>
      <Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={selectedMovie !== null}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Box sx={modalStyle}>
                <img style={{ width: '350px', borderRadius: '10px', height:'500px' }} src={selectedMovie?.photo} alt="product image" />
                <>
                  <Button
                    startIcon={<ConfirmationNumberIcon />}
                    sx={{
                      width: '45%',
                      height: '45px',
                      borderRadius: '5px',
                      border: 'none',
                      outline: '0',
                      padding: '12px',
                      color: 'white',
                      background: 'linear-gradient(180deg, #72be43, #F0FF42)',
                      textAlign: 'center',
                      cursor: 'pointer',
                      fontSize: '18px',
                      ':hover': {
                        opacity: 0.7
                      },
                      mr:'20px'
                    }}
                    onClick={() => navigate(`/order/${selectedMovie.id}/${selectedMovie.name}`)}
                  >
                    Đặt vé
                  </Button>
                  <Button
                    sx={{
                      width: 'fit-content',
                      height: '45px',
                      borderRadius: '5px',
                      border: '1px solid white',
                      outline: '0',
                      padding: '12px',
                      color: 'white',
                      background: 'black',
                      textAlign: 'center',
                      cursor: 'pointer',
                      fontSize: '18px',
                      ':hover': {
                        opacity: 0.7
                      }
                    }}
                    onClick={handleOpenDialog}
                    // href={selectedMovie?.trailerURL}
                  >
                    <Typography sx={{ fontSize:15 }}>Xem Trailer</Typography>
                  </Button>
                </>
              </Box>
              <Dialog open={isDialogOpen} onClose={handleCloseDialog} >
                <DialogTitle sx={{ bgcolor:'#1A1A1A', color:'white' }}>
                  Xem Trailer
                  <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleCloseDialog}>
                    <CloseIcon sx={{ color:'white' }} />
                  </IconButton>
                </DialogTitle>
                <DialogContent sx={{ bgcolor:'#1A1A1A' }}>
                  <iframe
                    width="550"
                    height="315"
                    src={selectedMovie?.trailerURL}
                    title="YouTube video player"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </DialogContent>
              </Dialog>
              <Box sx={{
                margin: 'auto', display:'flex'
              }}>
                <Box>
                  <Box sx={{ color: '#72be43', typography:'h6', fontSize:25, mb:'10px' }}>{selectedMovie?.name.toUpperCase()}</Box>
                  <Box sx={{ color: 'white', typography:'h6', fontSize:18 }}>{selectedMovie?.description}</Box>
                  <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Đạo diễn:{<Typography sx={{ color:'white', fontSize:18 }}>{selectedMovie?.director}</Typography>}</Box>
                  <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Diễn viên:{<Typography sx={{ color:'white', fontSize:18 }}>{selectedMovie?.actor}</Typography>}</Box>
                  <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Thể loại:{<Typography sx={{ color:'white', fontSize:18 }}>{selectedMovie?.category}</Typography>}</Box>
                  <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Thời lượng:{<Typography sx={{ color:'white', fontSize:18 }}>{selectedMovie?.duration} phút</Typography>}</Box>
                  <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Ngôn ngữ:{<Typography sx={{ color:'white', fontSize:18 }}>{selectedMovie?.language}</Typography>}</Box>
                  <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Ngày ra mắt:{<Typography sx={{ color:'white', fontSize:18 }}>{selectedMovie?.releaseDate}</Typography>}</Box>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  )
}
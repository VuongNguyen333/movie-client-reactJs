import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'

import InfoIcon from '@mui/icons-material/Info'
import React from 'react'
export default function Film(props) {

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
    maxHeight: '90%'
  }

  const modalStyle = {
    width: '90%',
    maxWidth: '400px', // Giới hạn kích thước modal tối đa
    margin: 'auto',
    borderRadius: '10px',
    alignItems: 'center',
    overFlow: 'hidden'
  }

  return (
    <>
      <div className="card">
        <img style={{ cursor: 'pointer' }} onClick={() => handleOpen(props)} className="product--image" src={props.url} alt="product image" />
        <h4 style={{ color: 'white' }}>{props.name.toUpperCase()}</h4>
        <p>
          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Box>
              <Button onClick={() => handleOpen(props)}>Đặt vé ngay</Button>
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
            >
              <InfoIcon onClick={() => handleOpen(props)} sx={{ display: 'flex', alignItems: 'center', color: 'white' }} />
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
                <img style={{ maxWidth: '300px', borderRadius: '10px' }} src={selectedMovie?.url} alt="product image" />
                <Button
                  sx={{
                    width: '180px',
                    height: '45px',
                    borderRadius: '5px',
                    border: 'none',
                    outline: '0',
                    padding: '12px',
                    color: 'white',
                    background: 'linear-gradient(180deg, #72b343, #72b343, #BFEA7C)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    fontSize: '18px',
                    ':hover': {
                      opacity: 0.7
                    }
                  }}
                >Đặt vé ngay</Button>
              </Box>
              <Box sx={{
                alignItems: 'center',
                display: 'flex',
                margin: 'auto'
              }}>
                <Box sx={{ color: 'white' }}>{selectedMovie?.description}</Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>


    </>

  )
}
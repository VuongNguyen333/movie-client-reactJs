import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber'
import InfoIcon from '@mui/icons-material/Info'
import Typography from '@mui/material/Typography'
import '~/components/Film/Film.css'
function BranchDetail({ branch }) {
  const [selectedBranch, setSelectedBranch] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const name = branch?.name
  const handleOpen = () => {
    setSelectedBranch(branch)
    setOpen(true)
  }
  const handleClose = () => {
    setSelectedBranch(null)
    setOpen(false)
  }

  const style = {
    display: 'flex',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 'fit-content',
    maxWidth:'70%',
    minWidth: '60%',
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
  return (
    <>
      <div className="card">
        <img style={{ cursor: 'pointer' }} onClick={() => handleOpen()} className="product--image" src={`data:image/jpeg;base64,${branch.photo}`} alt="product image" />
        <div
          onClick={() => handleOpen()}
          className="truncate-text"
          title={branch?.name.toUpperCase()}
          style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer', width: 'fit-content', ':hover': { color: 'red' } }}
        >
          {branch?.name?.toUpperCase()}
        </div>
        <p>
          <Box sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Box >
              <Button
                onClick={() => handleOpen()}
                startIcon={<ConfirmationNumberIcon fontSize='medium' />}>
                Xem chi tiết
              </Button>
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
              onClick={() => handleOpen()}
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
          open={selectedBranch !== null}
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
                <img style={{ width: '350px', borderRadius: '10px', height:'500px' }} src={`data:image/jpeg;base64,${selectedBranch?.photo}`} alt="product image" />
              </Box>
              <Box sx={{
                margin: 'auto', display:'flex'
              }}>
                <Box>
                  <Box sx={{ color: '#72be43', typography:'h6', fontSize:25, mb:'10px' }}>{name?.toUpperCase()}</Box>
                  <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Địa điểm:{<Typography sx={{ color:'white', fontSize:18 }}>{selectedBranch?.address}</Typography>}</Box>
                  <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Giới thiệu:{<Typography sx={{ color:'white', fontSize:18 }}>{selectedBranch?.introduction}</Typography>}</Box>
                  <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Khu vực:{<Typography sx={{ color:'white', fontSize:18 }}>{selectedBranch?.areaResponse?.name}</Typography>}</Box>
                  <Box sx={{ color: '#B4B4B8', display:'flex', gap:1, fontSize:18, mb:'8px' }}>Trạng thái:{<Typography sx={{ color:'white', fontSize:18 }}>{selectedBranch?.status.toString() === 'true' ? 'Đang hoạt động' : 'Dừng hoạt động'}</Typography>}</Box>
                  <Box sx={{ color:'#72be43', typography:'h6' }}>
                    CÁC QUY ĐỊNH GIÁ VÉ
                    <Typography sx={{ color:'#f1f1f1', fontSize:14 }}>
                    – Giá vé trẻ em áp dụng cho trẻ em có chiều cao dưới 1,3m. Yêu cầu trẻ em có mặt khi mua vé. Trẻ em dưới 0,7m sẽ được miễn phí vé khi mua cùng 01 vé người lớn đi kèm theo. Không áp dụng kèm với chương trình khuyến mãi ưu đãi về giá vé khác.
                    </Typography>
                    <Typography sx={{ color:'#f1f1f1', fontSize:14 }}>
                    – Giá vé thành viên U22 chỉ áp dụng cho thành viên dưới 22 tuổi khi mua vé. Không áp dụng kèm với chương trình khuyến mãi ưu đãi về giá vé khác. Mỗi thẻ thành viên U22 được áp dụng giá vé ưu đãi tối đa 02 vé/ngày.
                    </Typography>
                    <Typography sx={{ color:'#f1f1f1', fontSize:14 }}>
                      – Ngày lễ: 1/1, Giổ Tổ Hùng Vương 10/3 Âm Lịch, 30/4, 1/5, 02 Ngày Lễ Quốc Khánh
                    </Typography>
                    <Typography sx={{ color:'#f1f1f1', fontSize:14 }}>
                      – Giá vé Tết Âm Lịch sẽ được áp dụng riêng.
                    </Typography>
                    <Typography sx={{ color:'#f1f1f1', fontSize:14 }}>
                      – Suất chiếu đặc biệt áp dụng giá vé theo khung giờ của ngày. Không áp dụng các giá vé ưu đãi dành cho U22, Privilege Voucher/Staff Voucher, Happy Day. Trong trường hợp Suất chiếu đặc biệt cùng ngày với Happy Day sẽ áp dụng giá vé của Thứ 3
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  )
}

export default BranchDetail
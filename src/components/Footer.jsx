import { Typography, Link, Box, Container } from '@mui/material'

function Footer() {
  return (
    <Box
      sx={{
        color: '#fff',
        padding: '20px',
        textAlign: 'center',
        bgcolor: '#222831',
        width:'100%',
        bottom: 0
      }}
    >
      <Link
        href="#"
        target="_blank"
        rel="noopener"
        sx={{ color: '#fff', marginLeft: '10px' }}
      >
        Điều khoản sử dụng
      </Link>
      <Link
        href="#"
        target="_blank"
        rel="noopener"
        sx={{ color: '#fff', marginLeft: '10px' }}
      >
        Chăm sóc khách hàng
      </Link>
      <Link
        href="#"
        target="_blank"
        rel="noopener"
        sx={{ color: '#fff', marginLeft: '10px' }}
      >
        Chính sách bảo mật
      </Link>
      <Typography variant="body1">
        Bạn đang muốn thưởng thức những bộ phim mới nhất? Hãy truy cập vào
        trang web của chúng tôi để đặt vé phim online ngay hôm nay!
      </Typography>
      <Typography variant="body2" sx={{ marginTop: '10px' }}>
        © {new Date().getFullYear()} Vé Phim Online. Mọi quyền được bảo lưu.
      </Typography>
    </Box>
  )
}

export default Footer

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { HashLink as Link } from 'react-router-hash-link'
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
        to="/rules#terms"
        style={{ color:'#66CCCC', marginRight: '20px', textDecoration: 'underline' }}
      >
            Điều khoản sử dụng
      </Link>
      <Link
        to="/rules#customer-care"
        style={{ color:'#66CCCC', marginRight: '20px', textDecoration: 'underline' }}
      >
            Chăm sóc khách hàng
      </Link>
      <Link
        to="/rules#privacy-policy"
        style={{ color:'#66CCCC', textDecoration: 'underline' }}
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

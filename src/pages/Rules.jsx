import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/NavBar/NavBar'
import { getUserByIdAPI } from '../apis/userApi'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


const Rules = () => {
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
	}, [])
	return (
		<Container disableGutters maxWidth={false} sx={{ bgcolor: '#1a1d29' }}>
			<Box sx={{ height:'13vh' }}>
				<Navbar avatar={user?.avatar}></Navbar>
			</Box>
			<Box sx={{ height:'87vh', justifyContent:'center', display:'flex' }}>
				<Box sx={{ width:'80%', height:'100%', justifyContent:'center', overflow:'auto', 'scrollbar-width': 'none' }}>
					<Accordion id="aboutUs" sx={{ background:'#171922', color:'white' }} defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon sx={{ color:'white' }}/>}
							aria-controls="panel1-content"
						>
							<Typography variant="h6" sx={{ fontSize:'22px', color:'wheat' }}>
                        Về chúng tôi
							</Typography>
						</AccordionSummary>
						<hr color='black'/>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Giới Thiệu Về LuxC
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>LuxC là một hệ thống rạp chiếu phim hiện đại và đẳng cấp, cam kết mang đến cho khán giả những trải nghiệm điện ảnh tuyệt vời nhất. Với hệ thống âm thanh, hình ảnh tối tân và dịch vụ khách hàng xuất sắc, LuxC đã trở thành điểm đến lý tưởng cho những người yêu điện ảnh tại Việt Nam.</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Sứ Mệnh Của LuxC
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Tại LuxC, sứ mệnh của chúng tôi là mang đến cho khán giả những trải nghiệm điện ảnh vượt trội, kết nối cảm xúc và lan tỏa niềm đam mê nghệ thuật. Chúng tôi không chỉ chiếu phim, mà còn tạo ra những khoảnh khắc đáng nhớ, góp phần nâng cao chất lượng cuộc sống và gắn kết cộng đồng.</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Giá Trị Cốt Lõi
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Chất Lượng: Chúng tôi đặt chất lượng lên hàng đầu, từ cơ sở vật chất, trang thiết bị đến dịch vụ khách hàng.</Typography>
							<Typography>Đổi Mới: LuxC luôn tiên phong trong việc áp dụng công nghệ mới và cập nhật các xu hướng điện ảnh.</Typography>
							<Typography>Tận Tâm: Đội ngũ nhân viên của chúng tôi luôn sẵn sàng phục vụ khán giả với thái độ tận tâm và chuyên nghiệp.</Typography>
							<Typography>Trải Nghiệm Khách Hàng: Chúng tôi chú trọng vào việc mang đến những trải nghiệm tuyệt vời và đáng nhớ cho mỗi khách hàng.</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Cơ Sở Vật Chất
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Màn hình lớn với độ phân giải cao, mang đến hình ảnh sắc nét và sống động.</Typography>
							<Typography>Âm thanh vòm Dolby Atmos, tạo hiệu ứng âm thanh chân thực, sống động.</Typography>
							<Typography>Ghế ngồi thoải mái, thiết kế sang trọng, đảm bảo sự thư giãn tối đa cho khán giả.</Typography>
							<Typography>Phòng chiếu VIP dành cho những khách hàng muốn trải nghiệm không gian riêng tư và dịch vụ cao cấp.</Typography>
						</AccordionDetails>
					</Accordion>

					<Accordion id="terms" sx={{ background:'#171922', color:'white' }} defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon sx={{ color:'white' }}/>}
							aria-controls="panel1-content"
						>
							<Typography variant="h6" sx={{ fontSize:'22px', color:'wheat' }}>
                           Điều khoản sử dụng
							</Typography>
						</AccordionSummary>
						<hr color='black'/>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Điều khoản về vé
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Mua vé trực tuyến: Khách hàng có thể mua vé qua trang web hoặc ứng dụng di động của chúng tôi. Việc mua vé trực tuyến yêu cầu thanh toán đầy đủ tại thời điểm mua.</Typography>
							<Typography>Chính sách hoàn vé: Vé đã mua không thể hoàn lại trừ khi buổi chiếu bị hủy bỏ hoặc thay đổi do quyết định từ phía rạp chiếu phim.</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Quy tắc vào rạp
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Thời gian vào rạp: Khách hàng nên có mặt ít nhất 15 phút trước giờ chiếu để kiểm tra vé và tìm chỗ ngồi.</Typography>
							<Typography>Trẻ em và người dưới tuổi quy định: Trẻ em dưới 12 tuổi phải có người lớn đi kèm. Một số bộ phim có giới hạn tuổi xem và chúng tôi yêu cầu khách hàng tuân thủ.</Typography>
							<Typography>Kiểm tra vé: Bạn phải giữ vé hoặc mã QR trong suốt thời gian ở rạp và trình cho nhân viên kiểm tra khi được yêu cầu.</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Hành vi trong rạp chiếu
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Tuân thủ nội quy: Khách hàng phải tuân thủ các quy định của rạp, bao gồm việc không quay phim, chụp ảnh trong suốt buổi chiếu.</Typography>
							<Typography>Giữ trật tự: Hãy tắt hoặc để chế độ im lặng các thiết bị điện tử cá nhân và giữ trật tự để không làm phiền các khách hàng khác.</Typography>
							<Typography>Vệ sinh: Vui lòng giữ gìn vệ sinh trong rạp và không xả rác bừa bãi.</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Trách nhiệm và giới hạn
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Trách nhiệm của khách hàng: Khách hàng phải tự chịu trách nhiệm về tài sản cá nhân và hành vi của mình trong rạp.</Typography>
							<Typography>Giới hạn trách nhiệm: Rạp chiếu phim không chịu trách nhiệm về bất kỳ tổn thất, thiệt hại nào xảy ra do việc sử dụng dịch vụ của chúng tôi trừ khi do lỗi của chúng tôi.</Typography>
						</AccordionDetails>
					</Accordion>

					<Accordion id="customer-care" sx={{ background:'#171922', color:'white' }} defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon sx={{ color:'white' }}/>}
							aria-controls="panel2-content"
						>
							<Typography variant="h6" sx={{ fontSize:'22px', color:'wheat' }}>
                           Chăm sóc khách hàng
							</Typography>

						</AccordionSummary>
						<hr color='black'/>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Hỗ trợ trực tuyến
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Email hỗ trợ: Bạn có thể liên hệ với chúng tôi qua email tại [địa chỉ email]. Chúng tôi cam kết phản hồi email của bạn trong vòng 24 giờ làm việc.</Typography>
							<Typography>Trò chuyện trực tuyến: Dịch vụ trò chuyện trực tuyến của chúng tôi hoạt động từ 9h đến 21h hàng ngày. Truy cập vào trang web của chúng tôi và nhấp vào biểu tượng trò chuyện để bắt đầu cuộc trò chuyện với nhân viên hỗ trợ.</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Hỗ trợ tại rạp chiếu
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Quầy thông tin: Nhân viên tại quầy thông tin của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn và hỗ trợ bạn trong suốt quá trình xem phim.</Typography>
							<Typography>Hỗ trợ đặt vé: Nếu bạn gặp bất kỳ khó khăn nào trong việc đặt vé, nhân viên tại quầy vé sẽ giúp bạn giải quyết nhanh chóng và hiệu quả.</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Chính sách hoàn vé và đổi vé
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Hoàn vé: Vé đã mua không thể hoàn lại trừ khi buổi chiếu bị hủy bỏ hoặc thay đổi do quyết định từ phía rạp chiếu phim.</Typography>
							<Typography>Đổi vé: Trong trường hợp bạn cần đổi vé do lịch trình cá nhân, vui lòng liên hệ với chúng tôi trước giờ chiếu phim ít nhất 24 giờ. Chúng tôi sẽ hỗ trợ bạn đổi vé sang suất chiếu khác nếu có chỗ trống.</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                        Góp ý và khiếu nại
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
							<Typography>Góp ý: Chúng tôi luôn lắng nghe và trân trọng mọi góp ý từ khách hàng để cải thiện dịch vụ. Gửi góp ý của bạn qua email hoặc hộp thư góp ý tại rạp chiếu phim.</Typography>
							<Typography>Khiếu nại: Nếu bạn không hài lòng với bất kỳ khía cạnh nào của dịch vụ, vui lòng liên hệ với chúng tôi qua email hoặc điện thoại. Chúng tôi cam kết sẽ giải quyết khiếu nại của bạn một cách nhanh chóng và công bằng.</Typography>
						</AccordionDetails>
					</Accordion>

					<Accordion id="privacy-policy" sx={{ background:'#171922', color:'white' }} defaultExpanded>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon sx={{ color:'white' }}/>}
							aria-controls="panel3-content"
						>
							<Typography variant="h6" sx={{ fontSize:'22px', color:'wheat' }}>
                           Chính sách bảo mật
							</Typography>
						</AccordionSummary>
						<hr color='black'/>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                              Nội dung nhúng từ website khác
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
                           Văn bản được đề xuất: Các bài viết trên trang web này có thể bao gồm nội dung được nhúng (ví dụ: video, hình ảnh, bài viết, v.v.). Nội dung được nhúng từ các trang web khác hoạt động theo cùng một cách chính xác như khi khách truy cập đã truy cập trang web khác.
                           Những website này có thể thu thập dữ liệu về bạn, sử dụng cookie, nhúng các trình theo dõi của bên thứ ba và giám sát tương tác của bạn với nội dung được nhúng đó, bao gồm theo dõi tương tác của bạn với nội dung được nhúng nếu bạn có tài khoản và đã đăng nhập vào trang web đó.
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                              Chúng tôi chia sẻ dữ liệu của bạn với ai
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
                           Văn bản được đề xuất: If you request a password reset, your IP address will be included in the reset email.
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                              Dữ liệu của bạn tồn tại bao lâu
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
                           Văn bản được đề xuất: Nếu bạn để lại bình luận, bình luận và siêu dữ liệu của nó sẽ được giữ lại vô thời hạn. Điều này là để chúng tôi có thể tự động nhận ra và chấp nhận bất kỳ bình luận nào thay vì giữ chúng trong khu vực đợi kiểm duyệt.
                           Đối với người dùng đăng ký trên trang web của chúng tôi (nếu có), chúng tôi cũng lưu trữ thông tin cá nhân mà họ cung cấp trong hồ sơ người dùng của họ. Tất cả người dùng có thể xem, chỉnh sửa hoặc xóa thông tin cá nhân của họ bất kỳ lúc nào (ngoại trừ họ không thể thay đổi tên người dùng của họ). Quản trị viên trang web cũng có thể xem và chỉnh sửa thông tin đó.
						</AccordionDetails>
						<AccordionDetails>
							<Typography variant="button" sx={{ fontSize:'17px' }}>
                              Các quyền nào của bạn với dữ liệu của mình
							</Typography>
						</AccordionDetails>
						<AccordionDetails>
                           Văn bản được đề xuất: Nếu bạn có tài khoản trên trang web này hoặc đã để lại nhận xét, bạn có thể yêu cầu nhận tệp xuất dữ liệu cá nhân mà chúng tôi lưu giữ về bạn, bao gồm mọi dữ liệu bạn đã cung cấp cho chúng tôi. Bạn cũng có thể yêu cầu chúng tôi xóa mọi dữ liệu cá nhân mà chúng tôi lưu giữ về bạn. Điều này không bao gồm bất kỳ dữ liệu nào chúng tôi có nghĩa vụ giữ cho các mục đích hành chính, pháp lý hoặc bảo mật.
						</AccordionDetails>
					</Accordion>
				</Box>
			</Box>
			<Footer></Footer>
		</Container >
	)
}

export default Rules
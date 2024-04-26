export const convertResOtp = (arr) => {
  arr.pop()
  const formattedDateTimeArray = arr.map((item, index) => {
    if (index > 0 && index < 3) {
      // Thêm số 0 vào trước cho tháng và ngày
      return item.toString().padStart(2, '0')
    } else {
      // Thêm số 0 vào trước cho giờ, phút và giây
      return item.toString().padStart(2, '0')
    }
  })
  // Gắn kết các phần tử của mảng thành một chuỗi sử dụng ký tự '-' và 'T'
  const formattedDateTime = formattedDateTimeArray.slice(0, 3).join('-') + 'T' + formattedDateTimeArray.slice(3).join(':')
  return formattedDateTime
}
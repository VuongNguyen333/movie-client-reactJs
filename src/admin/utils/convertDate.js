const convert = (input) => {
  if (!input) return
  const parts = input?.split('/') // Tách chuỗi thành các thành phần ngày, tháng và năm
  const day = parts[0] // Lấy ngày từ chuỗi
  const month = parts[1] // Lấy tháng từ chuỗi
  const year = parts[2] // Lấy năm từ chuỗi
  const res = `${year}-${month}-${day}`
  return res
}
const convertToRequest = (input) => {
  const parts = input?.split('/') // Tách chuỗi thành các thành phần ngày, tháng và năm
  const day = parts[0] // Lấy ngày từ chuỗi
  const month = parts[1] // Lấy tháng từ chuỗi
  const year = parts[2] // Lấy năm từ chuỗi 
  const res = `${year}-${month}-${day}`
  return res
}

export const convertDate = {
  convert,
  convertToRequest
}
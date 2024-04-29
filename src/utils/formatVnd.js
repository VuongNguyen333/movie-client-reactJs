export const formatNumber = (number) => {
  // Định dạng số
  const formattedNumber = new Intl.NumberFormat('vi-VN').format(parseInt(number))
  return formattedNumber
}
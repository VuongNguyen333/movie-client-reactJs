export default function formatVnpPayDate(vnpPayDate) {
  const year = vnpPayDate.substring(0, 4)
  const month = vnpPayDate.substring(4, 6)
  const day = vnpPayDate.substring(6, 8)
  const hours = vnpPayDate.substring(8, 10)
  const minutes = vnpPayDate.substring(10, 12)
  const seconds = vnpPayDate.substring(12, 14)

  const date = new Date(year, month - 1, day, hours, minutes, seconds)

  const formattedDate = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)} ${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`

  return formattedDate
}
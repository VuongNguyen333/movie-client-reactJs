export default function formatZaloPayDate(timestamp) {
  const cutString = timestamp.substring(timestamp.indexOf('_') + 1, timestamp.indexOf('_') + 11)
  const date = new Date(Number(cutString) * 1000)

  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const seconds = ('0' + date.getSeconds()).slice(-2)

  const day = ('0' + date.getDate()).slice(-2)
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const year = date.getFullYear()

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`
}
export const convertStringToDate = (dateString) => {
  const dateObject = new Date(dateString)
  const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`
  return formattedDate
}
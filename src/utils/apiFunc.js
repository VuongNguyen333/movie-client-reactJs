export const getHeader=() => {
  const token=localStorage.getItem('token')
  return {
    Authorization:`Bearer ${token}`,
    'Content-Type':'multipart/form-data'
  }
}

export const getHeaderJson=() => {
  const token=localStorage.getItem('token')
  return {
    Authorization:`Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}
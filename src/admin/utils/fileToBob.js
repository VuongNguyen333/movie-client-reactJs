export default function fileToBlob(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const blob = new Blob([reader.result], { type: file.type })
      resolve(blob)
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

export const convertFile = async (file) => {
  const blob = await fileToBlob(file)
  return blob
}
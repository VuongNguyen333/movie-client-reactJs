export const resizeImage = (image, maxWidth, maxHeight) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  // Tính toán tỉ lệ thu nhỏ
  let width = image.width
  let height = image.height
  if (width > height) {
    if (width > maxWidth) {
      height *= maxWidth / width
      width = maxWidth
    }
  } else {
    if (height > maxHeight) {
      width *= maxHeight / height
      height = maxHeight
    }
  }

  // Gán kích thước mới cho canvas
  canvas.width = width
  canvas.height = height

  // Vẽ ảnh thu nhỏ lên canvas
  ctx.drawImage(image, 0, 0, width, height)

  return canvas.toDataURL('image/jpeg')
}

export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = url
  })
}

export const base64ToImage = (base64) => {
  const img = new Image();
  img.src = base64;
  return img;
}
export default function removeSameSeat(arr) {
  // Tạo một Map để đếm số lần xuất hiện của từng phần tử
  let countMap = new Map()
  arr.forEach(item => {
    countMap.set(item, (countMap.get(item) || 0) + 1)
  })

  // Tạo một danh sách để lưu trữ các phần tử không là phần tử chung
  let ketQua = []
  arr.forEach(item => {
    if (countMap.get(item) === 1) {
      ketQua.push(item)
    }
  })

  return ketQua
}
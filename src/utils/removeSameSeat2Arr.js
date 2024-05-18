export default function removeSameSeat2Arr(a, b) {
  // Chuyển mảng B thành một Set để kiểm tra phần tử có xuất hiện trong B hay không
  let setB = new Set(b)

  // Lọc các phần tử của mảng A mà không xuất hiện trong mảng B
  let ketQua = a.filter(item => !setB.has(item))

  return ketQua
}
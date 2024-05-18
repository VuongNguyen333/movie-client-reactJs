export default function findDiff(arr1, arr2) {
  let diff = []

  // Tìm các phần tử của mảng 1 không có trong mảng 2
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) === -1) {
      diff.push(arr1[i])
    }
  }

  // Tìm các phần tử của mảng 2 không có trong mảng 1
  for (let j = 0; j < arr2.length; j++) {
    if (arr1.indexOf(arr2[j]) === -1) {
      diff.push(arr2[j])
    }
  }

  return diff
}
export default function convertToListRole(data) {
  let listRoles = []
  data?.map(item => listRoles.push(item.id))
  return listRoles
}
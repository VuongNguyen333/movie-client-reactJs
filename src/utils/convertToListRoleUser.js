export default function convertToListRoleUser(data) {
  let listRoles = []
  data?.map(item => listRoles.push(item.name))
  return listRoles
}
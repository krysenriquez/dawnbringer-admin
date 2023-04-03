export default function getRolePermission(props) {
  const {moduleName, permission, permissions} = props

  const permissionObject = permissions.find((permission) => permission.moduleName == moduleName)

  return permissionObject[`${permission}`]
}

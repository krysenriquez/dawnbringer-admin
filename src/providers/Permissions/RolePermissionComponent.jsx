import {usePermissions} from './PermissionsProviders'
import {useState, useMemo} from 'react'
import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'

const RolePermissionComponent = (props) => {
  const {children, moduleName, permission} = props
  const {permissions} = usePermissions()
  const permissionsArray = useMemo(() => permissions, [permissions])
  const [canView, setCanView] = useState(false)

  useEffect(() => {
    if (permissionsArray) {
      const permissionManagement = permissionsArray.find(
        (permission) => permission.moduleName == moduleName
      )
      setCanView(permissionManagement && permissionManagement[`${permission}`])
    }
  }, [permissionsArray, moduleName])

  if (canView) return <>{children}</>

  return <></>
}

export default RolePermissionComponent

import {usePermissions} from './PermissionsProviders'
import {useState, useMemo} from 'react'
import {useEffect} from 'react'
import {Navigate} from 'react-router-dom'

const RolePermissionRoute = (props) => {
  const {children, moduleName, permission} = props
  const {permissions} = usePermissions()
  const permissionsArray = useMemo(() => permissions, [permissions])
  const [canAccess, setCanAccess] = useState(true)

  useEffect(() => {
    if (permissionsArray) {
      const permissionManagement = permissionsArray.find(
        (permission) => permission.moduleName == moduleName
      )

      setCanAccess(permissionManagement && permissionManagement[`${permission}`])
    }
  }, [permissionsArray, moduleName])

  if (canAccess) return <>{children}</>

  return <Navigate to='/dashboard' replace />
}

export default RolePermissionRoute

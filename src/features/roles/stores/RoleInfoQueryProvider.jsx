/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getUserTypeInfo, GET_USER_TYPE_INFO_URL} from '../api'

const RoleInfoQueryContext = createContext(initialQuery)

const RoleInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_USER_TYPE_INFO_URL, searchParams?.userTypeId],
    queryFn: () => getUserTypeInfo(searchParams?.userTypeId),
    enabled: !!searchParams?.userTypeId,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return <RoleInfoQueryContext.Provider value={value}>{children}</RoleInfoQueryContext.Provider>
}

const useRoleInfoQueryContext = () => {
  return useContext(RoleInfoQueryContext)
}

const useRoleInfoQueryData = () => {
  const {response} = useRoleInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useRoleInfoQueryLoading = () => {
  const {isLoading} = useRoleInfoQueryContext()
  return isLoading
}

export {
  RoleInfoQueryProvider,
  useRoleInfoQueryContext,
  useRoleInfoQueryData,
  useRoleInfoQueryLoading,
}

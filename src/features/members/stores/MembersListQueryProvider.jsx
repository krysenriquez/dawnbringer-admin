/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getMembers, GET_MEMBERS_URL} from '../api'

const MembersListQueryContext = createContext(initialQuery)

const MembersListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_MEMBERS_URL],
    queryFn: () => getMembers(),
    enabled: true,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <MembersListQueryContext.Provider value={value}>{children}</MembersListQueryContext.Provider>
  )
}

const useMembersListQueryContext = () => useContext(MembersListQueryContext)

const useMembersListQueryData = () => {
  const {response} = useMembersListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useMembersListQueryLoading = () => {
  const {isLoading} = useMembersListQueryContext()
  return isLoading
}

export {
  MembersListQueryProvider,
  useMembersListQueryContext,
  useMembersListQueryData,
  useMembersListQueryLoading,
}

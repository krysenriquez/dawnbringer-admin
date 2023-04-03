/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getMemberUserInfo, GET_MEMBER_USER_INFO_URL} from '../api'

const MemberUserInfoQueryContext = createContext(initialQuery)

const MemberUserInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_MEMBER_USER_INFO_URL, searchParams?.accountId],
    queryFn: () => getMemberUserInfo(searchParams?.accountId),
    enabled: !!searchParams?.accountId,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <MemberUserInfoQueryContext.Provider value={value}>
      {children}
    </MemberUserInfoQueryContext.Provider>
  )
}

const useMemberUserInfoQueryContext = () => {
  return useContext(MemberUserInfoQueryContext)
}

const useMemberUserInfoQueryData = () => {
  const {response} = useMemberUserInfoQueryContext()
  if (!response) {
    return {}
  }

  return response || {}
}

const useMemberUserInfoQueryLoading = () => {
  const {isLoading} = useMemberUserInfoQueryContext()
  return isLoading
}

export {
  MemberUserInfoQueryProvider,
  useMemberUserInfoQueryContext,
  useMemberUserInfoQueryData,
  useMemberUserInfoQueryLoading,
}

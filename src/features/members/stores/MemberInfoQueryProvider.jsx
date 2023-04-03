/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getMember, GET_MEMBER_INFO_URL} from '../api'

const MemberInfoQueryContext = createContext(initialQuery)

const MemberInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_MEMBER_INFO_URL, searchParams?.accountId],
    queryFn: () => getMember(searchParams?.accountId),
    enabled: !!searchParams?.accountId,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return <MemberInfoQueryContext.Provider value={value}>{children}</MemberInfoQueryContext.Provider>
}

const useMemberInfoQueryContext = () => {
  return useContext(MemberInfoQueryContext)
}

const useMemberInfoQueryData = () => {
  const {response} = useMemberInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useMemberInfoQueryLoading = () => {
  const {isLoading} = useMemberInfoQueryContext()
  return isLoading
}

export {
  MemberInfoQueryProvider,
  useMemberInfoQueryContext,
  useMemberInfoQueryData,
  useMemberInfoQueryLoading,
}

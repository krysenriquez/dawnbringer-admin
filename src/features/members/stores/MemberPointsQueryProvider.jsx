import {createContext, useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getMemberMembershipLevelPoints, GET_MEMBER_MEMBERSHIP_LEVEL_POINTS} from '../api'

const MemberPointsQueryContext = createContext(initialQuery)

const MemberPointsQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_MEMBER_MEMBERSHIP_LEVEL_POINTS, searchParams?.accountId],
    queryFn: () => getMemberMembershipLevelPoints(searchParams?.accountId),
    enabled: !!searchParams?.accountId,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <MemberPointsQueryContext.Provider value={value}>{children}</MemberPointsQueryContext.Provider>
  )
}

const useMemberPointsQueryContext = () => useContext(MemberPointsQueryContext)

const useMemberPointsQueryData = () => {
  const {response} = useMemberPointsQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useMemberPointsQueryLoading = () => {
  const {isLoading} = useMemberPointsQueryContext()
  return isLoading
}

export {
  MemberPointsQueryProvider,
  useMemberPointsQueryContext,
  useMemberPointsQueryData,
  useMemberPointsQueryLoading,
}

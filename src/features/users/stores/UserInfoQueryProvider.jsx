/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getUserInfo, GET_USER_INFO_URL} from '../api'

const UserInfoQueryContext = createContext(initialQuery)

const UserInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_USER_INFO_URL}-${searchParams.userId}`,
    () => {
      return getUserInfo(searchParams.userId)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return <UserInfoQueryContext.Provider value={value}>{children}</UserInfoQueryContext.Provider>
}

const useUserInfoQueryContext = () => {
  return useContext(UserInfoQueryContext)
}

const useUserInfoQueryData = () => {
  const {response} = useUserInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useUserInfoQueryLoading = () => {
  const {isLoading} = useUserInfoQueryContext()
  return isLoading
}

export {
  UserInfoQueryProvider,
  useUserInfoQueryContext,
  useUserInfoQueryData,
  useUserInfoQueryLoading,
}

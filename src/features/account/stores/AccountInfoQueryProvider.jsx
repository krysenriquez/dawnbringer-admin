/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getUserProfile, GET_PROFILE_URL} from '../api'

const AccountInfoQueryContext = createContext(initialQuery)

const AccountInfoQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_PROFILE_URL}`,
    () => {
      return getUserProfile()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <AccountInfoQueryContext.Provider value={value}>{children}</AccountInfoQueryContext.Provider>
  )
}

const useAccountInfoQueryContext = () => {
  return useContext(AccountInfoQueryContext)
}

const useAccountInfoQueryData = () => {
  const {response} = useAccountInfoQueryContext()
  if (!response) {
    return {}
  }

  return response || {}
}

const useAccountInfoQueryLoading = () => {
  const {isLoading} = useAccountInfoQueryContext()
  return isLoading
}

export {
  AccountInfoQueryProvider,
  useAccountInfoQueryContext,
  useAccountInfoQueryData,
  useAccountInfoQueryLoading,
}

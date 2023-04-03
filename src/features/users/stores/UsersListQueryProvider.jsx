/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getUsers, GET_USERS_URL} from '../api'

const UsersListQueryContext = createContext(initialQuery)

const UsersListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_USERS_URL],
    queryFn: () => getUsers(),
    enabled: true,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return <UsersListQueryContext.Provider value={value}>{children}</UsersListQueryContext.Provider>
}

const useUsersListQueryContext = () => {
  return useContext(UsersListQueryContext)
}

const useUsersListQueryData = () => {
  const {response} = useUsersListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useUsersListQueryLoading = () => {
  const {isLoading} = useUsersListQueryContext()
  return isLoading
}

export {
  UsersListQueryProvider,
  useUsersListQueryContext,
  useUsersListQueryData,
  useUsersListQueryLoading,
}

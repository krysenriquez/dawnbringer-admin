/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useParams} from 'react-router-dom'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getSectionComponentInfo, GET_SECTION_COMPONENT_INFO_URL} from '../../api'

const SectionComponentInfoQueryContext = createContext(initialQuery)

const SectionComponentInfoQueryProvider = ({children}) => {
  const searchParams = useParams()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery({
    queryKey: [GET_SECTION_COMPONENT_INFO_URL, searchParams?.sectionComponentId],
    queryFn: () => getSectionComponentInfo(searchParams?.sectionComponentId),
    enabled: !!searchParams?.sectionComponentId,
  })

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <SectionComponentInfoQueryContext.Provider value={value}>
      {children}
    </SectionComponentInfoQueryContext.Provider>
  )
}

const useSectionComponentInfoQueryContext = () => {
  return useContext(SectionComponentInfoQueryContext)
}

const useSectionComponentInfoQueryData = () => {
  const {response} = useSectionComponentInfoQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useSectionComponentInfoQueryLoading = () => {
  const {isLoading} = useSectionComponentInfoQueryContext()
  return isLoading
}

export {
  SectionComponentInfoQueryProvider,
  useSectionComponentInfoQueryContext,
  useSectionComponentInfoQueryData,
  useSectionComponentInfoQueryLoading,
}

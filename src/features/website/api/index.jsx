import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const SHOPS_URL = `${API_URL}/shop`
export const GET_PAGE_CONTENTS_URL = `${SHOPS_URL}/getpagecontents/`
export const GET_PAGE_CONTENT_INFO_URL = `${SHOPS_URL}/getpagecontent/`
export const GET_PAGE_COMPONENTS_URL = `${SHOPS_URL}/getpagecomponents/`
export const GET_PAGE_COMPONENT_INFO_URL = `${SHOPS_URL}/getpagecomponent/`
export const GET_SECTION_COMPONENTS_URL = `${SHOPS_URL}/getsectioncomponents/`
export const GET_SECTION_COMPONENT_INFO_URL = `${SHOPS_URL}/getsectioncomponent/`

export const getPageContents = () => {
  return axios.get(`${GET_PAGE_CONTENTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getPageContentInfo = (id) => {
  return axios
    .get(
      `${GET_PAGE_CONTENT_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          id: id,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const getPageComponents = () => {
  return axios.get(`${GET_PAGE_COMPONENTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getPageComponentInfo = (id) => {
  return axios
    .get(
      `${GET_PAGE_COMPONENT_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          id: id,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const getSectionComponents = () => {
  return axios.get(`${GET_SECTION_COMPONENTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getSectionComponentInfo = (id) => {
  return axios
    .get(
      `${GET_SECTION_COMPONENT_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          id: id,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

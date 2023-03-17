import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const SHOPS_URL = `${API_URL}/shop`
export const GET_PAGE_CONTENTS_URL = `${SHOPS_URL}/getpagecontents/`
export const GET_PAGE_CONTENT_INFO_URL = `${SHOPS_URL}/getpagecontent/`
const CREATE_PAGE_CONTENT_URL = `${SHOPS_URL}/createpagecontent/`
const UPDATE_PAGE_CONTENT_URL = `${SHOPS_URL}/updatepagecontent/`

export const GET_PAGE_COMPONENTS_URL = `${SHOPS_URL}/getpagecomponents/`
export const GET_PAGE_COMPONENT_INFO_URL = `${SHOPS_URL}/getpagecomponent/`
const CREATE_PAGE_COMPONENT_URL = `${SHOPS_URL}/createpagecomponent/`
const UPDATE_PAGE_COMPONENT_URL = `${SHOPS_URL}/updatepagecomponent/`

export const GET_SECTION_COMPONENTS_URL = `${SHOPS_URL}/getsectioncomponents/`
export const GET_SECTION_COMPONENT_INFO_URL = `${SHOPS_URL}/getsectioncomponent/`
const CREATE_SECTION_COMPONENT_URL = `${SHOPS_URL}/createsectioncomponent/`
const UPDATE_SECTION_COMPONENT_URL = `${SHOPS_URL}/updatesectioncomponent/`

export const getPageContents = () => {
  return axios.get(`${GET_PAGE_CONTENTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getPageContentInfo = (pageContentId) => {
  return axios
    .get(
      `${GET_PAGE_CONTENT_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          pageContentId: pageContentId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const createPageContent = (values) => {
  return axios.post(`${CREATE_PAGE_CONTENT_URL}`, humps.decamelizeKeys(values))
}

export const updatePageContent = (values) => {
  return axios.post(`${UPDATE_PAGE_CONTENT_URL}`, humps.decamelizeKeys(values))
}

export const getPageComponents = () => {
  return axios.get(`${GET_PAGE_COMPONENTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getPageComponentInfo = (pageComponentId) => {
  return axios
    .get(
      `${GET_PAGE_COMPONENT_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          pageComponentId: pageComponentId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const createPageComponent = (values) => {
  return axios.post(`${CREATE_PAGE_COMPONENT_URL}`, humps.decamelizeKeys(values))
}

export const updatePageComponent = (values) => {
  return axios.post(`${UPDATE_PAGE_COMPONENT_URL}`, humps.decamelizeKeys(values))
}

export const getSectionComponents = () => {
  return axios.get(`${GET_SECTION_COMPONENTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getSectionComponentInfo = (sectionComponentId) => {
  return axios
    .get(
      `${GET_SECTION_COMPONENT_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          sectionComponentId: sectionComponentId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const createSectionComponent = (values) => {
  return axios.post(`${CREATE_SECTION_COMPONENT_URL}`, values, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

export const updateSectionComponent = (values) => {
  return axios.post(`${UPDATE_SECTION_COMPONENT_URL}`, values, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

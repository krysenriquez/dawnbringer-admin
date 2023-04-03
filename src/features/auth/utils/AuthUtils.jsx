import {setLocalStorage, getLocalStorage, removeLocalStorage} from '@/utils/localStorage'

const AUTH_LOCAL_STORAGE_KEY = import.meta.env.VITE_APP_PREFIX + 'a_token'
const AUTH_LOCAL_STORAGE_KEY_DURATION = 1000 * 60 * 4

const getAuth = () => {
  if (!localStorage) {
    return
  }

  const auth = getLocalStorage(AUTH_LOCAL_STORAGE_KEY)
  if (!auth) {
    return
  }
  return auth
}

const setAuth = (auth) => {
  if (!localStorage) {
    return
  }

  try {
    setLocalStorage(AUTH_LOCAL_STORAGE_KEY, auth)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    removeLocalStorage(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config) => {
      const auth = getAuth()

      if (auth && auth.access) {
        config.headers.Authorization = `Bearer ${auth.access}`
      }

      return config
    },
    (err) => Promise.reject(err)
  )
}

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY_DURATION}

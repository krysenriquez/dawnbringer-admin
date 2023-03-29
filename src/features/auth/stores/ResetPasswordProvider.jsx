/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {verifyForgotPassword} from '../api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ResetPasswordContext = createContext({
  token: undefined,
  verified: false,
})

const ResetPasswordProvider = ({children}) => {
  const swal = withReactContent(Swal)
  const navigate = useNavigate()
  const searchParams = useParams()
  const didRequest = useRef(false)
  const urlData = searchParams['*']
  const [token, setToken] = useState(undefined)
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const validateResetPasswordLink = async () => {
      try {
        if (!didRequest.current) {
          const data = await verifyForgotPassword({data: urlData})
          if (data) {
            swal.fire('Link Verified!', 'Please reset your password.', 'success').then((result) => {
              setVerified(true)
              setToken(data)
            })
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          swal.fire('Invalid Link!', error.response.data.detail, 'error').then((result) => {
            setVerified(false)
            navigate('/')
          })
        }
      }

      return () => (didRequest.current = true)
    }

    if (urlData) {
      validateResetPasswordLink()
    }
  }, [urlData])

  const value = {
    token,
    verified,
  }
  return <ResetPasswordContext.Provider value={value}>{children}</ResetPasswordContext.Provider>
}

const useResetPasswordContext = () => {
  return useContext(ResetPasswordContext)
}

export {ResetPasswordProvider, useResetPasswordContext}

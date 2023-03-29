import {useState} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {Form, Formik} from 'formik'
import {useIntl} from 'react-intl'
import {useAuth} from '@/providers/AuthProvider'
import {getUserByToken, login} from '../api'
import {toast} from 'react-toastify'
import InputField from '@/components/elements/Input/InputField'
import PasswordField from '@/components/elements/Input/PasswordField'

import loginFormModel from '../models/Login/loginFormModel'
import loginSchema from '../models/Login/loginSchema'
import loginInitialValues from '../models/Login/loginInitialValues'

const LoginForm = () => {
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const [enableForgotPassword, setEnableForgotPassword] = useState(true)
  const [initialLogin, setInitialLogin] = useState(loginInitialValues)

  const {
    formId,
    formField: {username, password},
  } = loginFormModel

  const submit = async (values, actions) => {
    actions.setSubmitting(true)
    try {
      const {data: auth} = await login(values.username, values.password)
      saveAuth(auth)
      const data = await getUserByToken(auth.access)
      setCurrentUser(data)
      toast.success('Login Success!')
    } catch (error) {
      saveAuth(undefined)
      toast.error('Login Failed!')
    } finally {
      actions.setSubmitting(false)
      actions.resetForm()
    }
  }

  return (
    <Formik
      enableReinitialize
      validationSchema={loginSchema}
      initialValues={initialLogin}
      onSubmit={submit}
    >
      {(actions) => (
        <Form className='form w-100' id={formId}>
          <div className='text-center mb-10'>
            <h1 className='text-dark mb-3'>{intl.formatMessage({id: 'LOGIN.HEADER'})}</h1>
          </div>
          <div className='fv-row mb-7'>
            <InputField
              className='form-control form-control-lg'
              name={username.name}
              placeholder={username.label}
            />
          </div>
          <div className='mb-7'>
            <PasswordField
              className='form-control form-control-lg'
              name={password.name}
              placeholder={password.label}
            />
          </div>
          <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
            <div></div>
            {enableForgotPassword ? (
              <Link
                to='/forgot-password'
                className='link-primary fs-6 fw-bolder'
                style={{marginLeft: '5px'}}
              >
                Forgot Password ?
              </Link>
            ) : (
              <></>
            )}
          </div>
          <div className='text-center'>
            <button
              type='submit'
              className='btn btn-lg btn-primary w-100 mb-5'
              disabled={actions.isSubmitting || !actions.isValid || !actions.touched}
            >
              {!actions.isSubmitting && <span className='indicator-label'>Log In</span>}
              {actions.isSubmitting && (
                <span className='indicator-progress' style={{display: 'block'}}>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm

import * as Yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(Yup)
import {useIntl} from 'react-intl'
import {Link, useNavigate} from 'react-router-dom'
import {Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useResetPasswordContext} from '../stores/ResetPasswordProvider'
import {resetPassword} from '../api'
import PasswordField from '@/components/elements/Input/PasswordField'

import resetPasswordFormModel from '../models/ResetPassword/resetPasswordFormModel'
import resetPasswordSchema from '../models/ResetPassword/resetPasswordSchema'
import resetPasswordInitialValues from '../models/ResetPassword/resetPasswordInitialValues'

const ResetPasswordForm = () => {
  const intl = useIntl()
  const navigate = useNavigate()
  const swal = withReactContent(Swal)
  const {verified, token} = useResetPasswordContext()

  const {
    formId,
    formField: {newPassword, confirmNewPassword},
  } = resetPasswordFormModel

  const submit = async (values, actions) => {
    actions.setSubmitting(true)
    try {
      values.refresh = token.refresh
      const {data: response} = await resetPassword(values, token)
      swal.fire('Password Updated!', response.detail, 'success').then((result) => {
        navigate('/')
      })
    } catch (error) {
      toast.error(error.response.data.detail)
    } finally {
      actions.setSubmitting(false)
      actions.resetForm()
    }
  }

  return (
    <>
      {verified ? (
        <Formik
          enableReinitialize
          validateOnChange={false}
          validationSchema={resetPasswordSchema}
          initialValues={resetPasswordInitialValues}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form w-100 pb-lg-20' id={formId}>
              <div className='text-center mb-10'>
                <h1 className='text-dark mb-3'>{intl.formatMessage({id: 'RESET.HEADER'})}</h1>
                <div className='text-gray-700 fw-semibold fs-6'>
                  Enter your new password credentials
                </div>
              </div>
              <div className='mb-10'>
                <PasswordField
                  name={newPassword.name}
                  label={newPassword.label}
                  className='form-control form-control-solid form-control-lg'
                  required
                />
              </div>
              <div className='mb-10'>
                <PasswordField
                  name={confirmNewPassword.name}
                  label={confirmNewPassword.label}
                  className='form-control form-control-solid form-control-lg'
                  required
                />
              </div>
              <div className='fv-row mb-10'></div>
              <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
                <button
                  type='submit'
                  className='btn btn-primary me-4'
                  disabled={actions.isSubmitting || !actions.isValid || !actions.touched}
                >
                  {!actions.isSubmitting && <span className='indicator-label'>Continue</span>}
                  {actions.isSubmitting && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
                <Link to='/' className='btn btn-light'>
                  Cancel
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <></>
      )}
    </>
  )
}

export default ResetPasswordForm

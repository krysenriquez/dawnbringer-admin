import {useState} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useStateProviderContext} from '@/providers/StateProvider'
import {changePassword} from '@/features/account/api'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import PasswordField from '@/components/elements/Input/PasswordField'

import changePasswordFormModel from '@/features/account/models/Password/changePasswordFormModel'
import changePasswordSchema from '@/features/account/models/Password/changePasswordSchema'
import changePasswordInitialValues from '@/features/account/models/Password/changePasswordInitialValues'

const ChangePasswordForm = () => {
  const {refresh} = useStateProviderContext()
  const swal = withReactContent(Swal)
  const {toggleModal} = useModalContext()

  const {
    formId,
    formField: {
      user: {currentPassword, newPassword, confirmNewPassword},
    },
  } = changePasswordFormModel

  const [initialPassword, setInitialPassword] = useState(changePasswordInitialValues)

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refresh()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Update Password?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Update',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await changePassword(values.user)
            swal.fire('Password Updated!', response.detail, 'success')
          } catch (ex) {
            toast.error(ex.response.data.detail)
          } finally {
            actions.resetForm()
          }
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
        cancel()
      })
  }

  return (
    <div className='d-flex flex-wrap align-items-center'>
      <div className='flex-row-fluid'>
        <Formik
          enableReinitialize
          validationSchema={changePasswordSchema}
          initialValues={initialPassword}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form'>
              <div className='row'>
                <div className='mb-4'>
                  <PasswordField
                    className='form-control'
                    name={currentPassword.name}
                    label={currentPassword.label}
                    required
                  />
                </div>
                <div className='mb-4'>
                  <PasswordField
                    className='form-control'
                    name={newPassword.name}
                    label={newPassword.label}
                    required
                  />
                </div>
                <div className='mb-4'>
                  <PasswordField
                    className='form-control'
                    name={confirmNewPassword.name}
                    label={confirmNewPassword.label}
                    required
                  />
                </div>
              </div>
              <div className='text-center pt-10'>
                <button type='button' className='btn btn-light px-6 me-3' onClick={cancel}>
                  Cancel
                </button>
                <button
                  type='submit'
                  className='btn btn-primary  me-2 px-6'
                  disabled={actions.isSubmitting || !actions.isValid}
                >
                  {!actions.isSubmitting && <span className='indicator-label'>Update</span>}
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
      </div>
    </div>
  )
}

export default ChangePasswordForm

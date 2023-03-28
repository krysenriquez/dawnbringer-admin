import {useEffect, useState} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useStateProviderContext} from '@/providers/StateProvider'
import {useAuth} from '@/providers/AuthProvider'
import {changeUsername} from '@/features/account/api'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import InputField from '@/components/elements/Input/InputField'
import PasswordField from '@/components/elements/Input/PasswordField'

import changeUsernameFormModel from '@/features/account/models/Username/changeUsernameFormModel'
import changeUsernameSchema from '@/features/account/models/Username/changeUsernameSchema'
import changeUsernameInitialValues from '@/features/account/models/Username/changeUsernameInitialValues'

const ChangeUsernameForm = () => {
  const {currentUser} = useAuth()
  const {refresh} = useStateProviderContext()
  const swal = withReactContent(Swal)
  const {toggleModal} = useModalContext()
  const [initialUsername, setInitialUsername] = useState(changeUsernameInitialValues)

  const {
    formId,
    formField: {
      user: {username, confirmPassword},
    },
  } = changeUsernameFormModel

  useEffect(() => {
    if (currentUser) {
      setInitialUsername((prevState) => {
        return {...prevState, user: {username: currentUser.username, confirmPassword: ''}}
      })
    }
  }, [currentUser])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refresh()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Update Username?',
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
            const {data: response} = await changeUsername(values.user)
            swal.fire('Username Updated!', response.detail, 'success')
          } catch (ex) {
            toast.error(ex.response.data.detail)
          } finally {
            actions.resetForm()
          }
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
        cancel(true)
      })
  }

  return (
    <div className='d-flex flex-wrap align-items-center'>
      <div className='flex-row-fluid'>
        <Formik
          enableReinitialize
          validationSchema={changeUsernameSchema}
          initialValues={initialUsername}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form' id={formId}>
              <div className='row'>
                <div className='mb-4'>
                  <InputField
                    className='form-control'
                    name={username.name}
                    label={username.label}
                    required
                  />
                </div>
                <div className='mb-4'>
                  <PasswordField
                    className='form-control'
                    name={confirmPassword.name}
                    label={confirmPassword.label}
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
                  className='btn btn-primary me-2 px-6'
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

export default ChangeUsernameForm

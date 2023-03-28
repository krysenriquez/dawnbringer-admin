import {useEffect, useState} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useStateProviderContext} from '@/providers/StateProvider'
import {useAuth} from '@/providers/AuthProvider'
import {changeEmailAddress} from '@/features/account/api'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import InputField from '@/components/elements/Input/InputField'
import PasswordField from '@/components/elements/Input/PasswordField'

import changeEmailAddressFormModel from '@/features/account/models/EmailAddress/changeEmailAddressFormModel'
import changeEmailAddressSchema from '@/features/account/models/EmailAddress/changeEmailAddressSchema'
import changeEmailAddressInitialValues from '@/features/account/models/EmailAddress/changeEmailAddressInitialValues'

const ChangeEmailAddressForm = () => {
  const {currentUser} = useAuth()
  const {refresh} = useStateProviderContext()
  const swal = withReactContent(Swal)
  const {toggleModal} = useModalContext()
  const [initialEmailAddress, setInitialEmailAddress] = useState(changeEmailAddressInitialValues)

  const {
    formId,
    formField: {
      user: {emailAddress, confirmPassword},
    },
  } = changeEmailAddressFormModel

  useEffect(() => {
    if (currentUser) {
      setInitialEmailAddress((prevState) => {
        return {...prevState, user: {emailAddress: currentUser.emailAddress, confirmPassword: ''}}
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
        title: 'Update Email Address?',
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
            const {data: response} = await changeEmailAddress(values.user)
            swal.fire('Email Address updated!', response.detail, 'success')
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
          validationSchema={changeEmailAddressSchema}
          initialValues={initialEmailAddress}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form' id={formId}>
              <div className='row mb-6'>
                <div className='mb-4'>
                  <InputField
                    className='form-control'
                    name={emailAddress.name}
                    label={emailAddress.label}
                    required
                  />
                </div>
              </div>
              <div className='row mb-6'>
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

export default ChangeEmailAddressForm

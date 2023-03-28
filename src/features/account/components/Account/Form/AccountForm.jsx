import {useEffect, useState} from 'react'
import humps, {decamelizeKeys} from 'humps'
import {Formik, Form, FieldArray} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useAccountInfoQueryData,
  useAccountInfoQueryLoading,
  useAccountInfoQueryContext,
} from '../../../stores/AccountInfoQueryProvider'
import {updateUserProfile} from '@/features/account/api'
import InputField from '@/components/elements/Input/InputField'
import ImageInputField from '@/components/elements/Input/ImageInputField'

import profileFormModel from '@/features/account/models/Account/accountFormModel'
import profileSchema from '@/features/account/models/Account/accountSchema'
import profileInitialValues from '@/features/account/models/Account/accountInitialValues'

const AccountForm = () => {
  const swal = withReactContent(Swal)
  const accountInfo = useAccountInfoQueryData()
  const isLoading = useAccountInfoQueryLoading()
  const {refetch} = useAccountInfoQueryContext()
  const [initialProfile, setInitialProfile] = useState(profileInitialValues)

  const {
    formId,
    formField: {avatar, displayName},
  } = profileFormModel

  useEffect(() => {
    if (accountInfo && !isLoading) {
      setInitialProfile((prevState) => {
        return {
          ...prevState,
          avatar: accountInfo.avatar ? accountInfo.avatar : '',
          displayName: accountInfo.displayName,
        }
      })
    }
  }, [accountInfo, isLoading])

  const submit = async (values, actions) => {
    const formData = transformToFormData(values)
    swal
      .fire({
        title: 'Update Account?',
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
            const {data: response} = await updateUserProfile(formData)
            swal.fire('Account Updated!', response.detail, 'success')
          } catch (ex) {
            toast.error(ex.detail)
          } finally {
            actions.setSubmitting(true)
          }
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
        refetch()
      })
  }

  const transformToFormData = (values) => {
    const formData = new FormData()
    const thumbnail = values.avatar
    const decamelizedValues = humps.decamelizeKeys(values)

    for (var keys in decamelizedValues) {
      if (keys != 'avatar') {
        formData.append(keys, JSON.stringify(decamelizedValues[keys]))
      }
    }

    if (thumbnail instanceof File) {
      formData.append(`avatar`, thumbnail)
    }

    return formData
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0' role='button'>
        <div className='card-title m-0'>
          <h3 className='fw-bold m-0'>Account Details</h3>
        </div>
      </div>
      <div>
        <Formik
          enableReinitialize
          validationSchema={profileSchema}
          initialValues={initialProfile}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form' id={formId}>
              <div className='card-body border-top p-9'>
                <div className='row'>
                  <div className='col-12'>
                    <label className='form-label mb-3'>
                      <span>Avatar</span>
                    </label>
                  </div>
                </div>
                <div className='row mb-6'>
                  <div className='col-12'>
                    <ImageInputField name={avatar.name} />
                  </div>
                </div>
                <div className='mb-5 row'>
                  <div className='col-12'>
                    <InputField
                      className='form-control'
                      name={displayName.name}
                      label={displayName.label}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={actions.isSubmitting || !actions.isValid}
                >
                  {!actions.isSubmitting && <span className='indicator-label'> Save Changes</span>}
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

export default AccountForm

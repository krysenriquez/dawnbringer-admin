import {useState, useEffect} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {createUser} from '../../api'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {useUserCreate} from '../../stores/UserCreateProvider'
import {arrayObjectToSelectOptions} from '@/utils/arrayToSelectOptions'
import {useUsersListQueryContext} from '../../stores/UsersListQueryProvider'
import InputField from '@/components/elements/Input/InputField'
import PasswordField from '@/components/elements/Input/PasswordField'
import SelectField from '@/components/elements/Input/SelectField'
import CheckboxField from '@/components/elements/Input/CheckboxField'

import userCreateFormModel from '../../models/UserCreate/userCreateFormModel'
import userCreateFormSchema from '../../models/UserCreate/userCreateFormSchema'
import userCreateInitialValues from '../../models/UserCreate/userCreateInitialValues'

const UserCreateForm = () => {
  const {toggleModal} = useModalContext()
  const {refetch} = useUsersListQueryContext()
  const swal = withReactContent(Swal)
  const {userTypes} = useUserCreate()
  const [initialUser, setInitialUser] = useState(userCreateInitialValues)

  const {
    formId,
    formField: {username, displayName, userType, emailAddress, password, repeatPassword, isActive},
  } = userCreateFormModel

  const [userTypeOptions, setUserTypeOptions] = useState([])
  useEffect(() => {
    if (userTypes) {
      setUserTypeOptions(
        arrayObjectToSelectOptions(userTypes, 'id', 'userTypeName', 'Select User Type')
      )
    }
  }, [userTypes])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Create User?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Create',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await createUser(values)
            swal.fire('User Created', response.detail, 'success')
            toast.success(response.detail)
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
    <Formik
      enableReinitialize={true}
      validateOnChange={false}
      validationSchema={userCreateFormSchema}
      initialValues={initialUser}
      onSubmit={submit}
    >
      {(actions) => (
        <Form id={formId} className='form'>
          <div className='d-flex flex-column scroll-y me-n7 pe-4'>
            <div className='mb-7'>
              <InputField
                className='form-control'
                name={displayName.name}
                placeholder={displayName.label}
              />
            </div>
            <div className='row mb-7'>
              <div className='col-6'>
                <InputField
                  className='form-control'
                  name={username.name}
                  placeholder={username.label}
                />
              </div>
              <div className='col-6'>
                <InputField
                  className='form-control'
                  name={emailAddress.name}
                  placeholder={emailAddress.label}
                  required
                />
              </div>
            </div>
            <div className='mb-10'>
              <SelectField
                className='form-select'
                name={userType.name}
                label={userType.label}
                data={userTypeOptions}
              />
            </div>
            <div className='mb-7'>
              <PasswordField
                className='form-control'
                name={password.name}
                placeholder={password.label}
                helperText={password.helperText}
              />
            </div>
            <div className='mb-7'>
              <PasswordField
                className='form-control'
                name={repeatPassword.name}
                placeholder={repeatPassword.label}
              />
            </div>
            <div className='row'>
              <div className='col-6'>
                <div className='mb-7'>
                  <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                    <span>Is User Active?</span>
                  </label>
                  <label className='form-check form-switch form-check-custom form-check-solid'>
                    <CheckboxField name={isActive.name} label={isActive.label} required />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='text-center pt-15'>
            <button
              type='reset'
              onClick={() => cancel()}
              className='btn btn-light me-3'
              disabled={actions.isSubmitting}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={actions.isSubmitting || !actions.isValid || !actions.touched}
            >
              <span className='indicator-label'>Submit</span>
              {actions.isSubmitting && (
                <span className='indicator-progress'>
                  Please wait...{' '}
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

export default UserCreateForm

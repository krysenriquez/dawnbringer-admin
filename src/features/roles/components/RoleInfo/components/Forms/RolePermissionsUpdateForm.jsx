import {useParams} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {useState, useEffect, useRef} from 'react'
import _ from 'lodash'
import {Formik, Form, FieldArray} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import BlockUi from '@availity/block-ui'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {
  useRoleInfoQueryData,
  useRoleInfoQueryContext,
  useRoleInfoQueryLoading,
} from '@/features/roles/stores/RoleInfoQueryProvider'
import {useRolePermissionsUpdate} from '@/features/roles/stores/RolePermissionsUpdateProvider'
import {updateRolePermissions} from '@/features/roles/api'
import CheckboxUnstyledField from '@/components/elements/Input/CheckBoxUnstyledField'
import rolePermissionsFormModel from '@/features/roles/models/rolePermissionsFormModel'
import rolePermissionsInitialValues from '@/features/roles/models/rolePermissionsInitialValues'
import rolePermissionsSchema from '@/features/roles/models/rolePermissionsSchema'

const RolePermissionsUpdateForm = () => {
  const searchParams = useParams()
  const intl = useIntl()
  const swal = withReactContent(Swal)
  const {toggleModal} = useModalContext()
  const userTypeInfo = useRoleInfoQueryData()
  const isLoading = useRoleInfoQueryLoading()
  const {refetch} = useRoleInfoQueryContext()
  const {modules} = useRolePermissionsUpdate()
  const [initialRolePermissions, setInitialRolePermissions] = useState(rolePermissionsInitialValues)
  const formikActions = useRef(null)

  const {
    formId,
    formField: {
      userTypeId,
      permissions: [{module, canCreate, canRetrieve, canUpdate, canDelete}],
    },
  } = rolePermissionsFormModel

  useEffect(() => {
    if (modules) {
      let permissions = []
      modules.map((module) => {
        return permissions.push({
          module: module.id,
          moduleName: module.moduleName,
          canCreate: false,
          canRetrieve: false,
          canDelete: false,
          canUpdate: false,
        })
      })

      if (userTypeInfo && !isLoading) {
        const permissionDifference = permissions.map((permission1) => {
          const permission2 = userTypeInfo.permissions.find(
            (permission) => permission.moduleName === permission1.moduleName
          )
          return permission2 ? {...permission1, ...permission2} : permission1
        })

        setInitialRolePermissions((prevState) => {
          return {
            ...prevState,
            userTypeId: searchParams.userTypeId,
            permissions: permissionDifference,
          }
        })
      }
    }
  }, [modules, userTypeInfo, isLoading])

  const checkAll = (e) => {
    if (e.target.checked) {
      formikActions.current.values.permissions.map((permission) => {
        formikActions.current.setFieldValue((permission.canCreate = true))
        formikActions.current.setFieldValue((permission.canRetrieve = true))
        formikActions.current.setFieldValue((permission.canUpdate = true))
        formikActions.current.setFieldValue((permission.canDelete = false))
      })
    } else {
      formikActions.current.values.permissions.map((permission) => {
        formikActions.current.setFieldValue((permission.canCreate = false))
        formikActions.current.setFieldValue((permission.canRetrieve = false))
        formikActions.current.setFieldValue((permission.canUpdate = false))
        formikActions.current.setFieldValue((permission.canDelete = false))
      })
    }
  }

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Update Role Permissions?',
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
            const {data: response} = await updateRolePermissions(values)
            swal.fire('Role Permissions Updated!', response.detail, 'success')
          } catch (ex) {
            toast.error(ex.response.data.detail)
          } finally {
            actions.setSubmitting(true)
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
      enableReinitialize
      validateOnChange={false}
      validationSchema={rolePermissionsSchema}
      initialValues={initialRolePermissions}
      onSubmit={submit}
    >
      {(actions) => {
        formikActions.current = actions
        return (
          <BlockUi blocking={actions.isSubmitting} message='Updating Order'>
            <Form id={formId} className='form'>
              <div className='d-flex flex-column scroll-y me-n7 pe-4'>
                <div className='mb-0'>
                  <h5 className='mb-4'>Role Permissions:</h5>
                  <div className='table-responsive'>
                    <table className='table align-middle table-row-dashed fs-6 gy-5'>
                      <tbody className='text-gray-600 fw-semibold'>
                        <tr>
                          <td className='text-gray-800'>
                            Administrator Access
                            <i
                              className='fas fa-exclamation-circle ms-1 fs-7'
                              data-bs-toggle='tooltip'
                              aria-label='Allows a full access to the system'
                              data-bs-original-title='Allows a full access to the system'
                              data-kt-initialized={1}
                            />
                          </td>
                          <td>
                            <label className='form-check form-check-sm form-check-custom form-check-solid me-9'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                defaultValue=''
                                onChange={(e) => checkAll(e)}
                              />
                              <span className='form-check-label fw-bold text-gray-400'>
                                Select all
                              </span>
                            </label>
                          </td>
                        </tr>
                        <FieldArray
                          name='permissions'
                          render={(arrayHelpers) => (
                            <>
                              {actions.values.permissions &&
                                actions.values.permissions.map((permission, index) => {
                                  return (
                                    <tr key={permission.moduleName}>
                                      <td className='text-gray-800'>{permission.moduleName}</td>
                                      <td>
                                        <div className='d-flex'>
                                          <label className='form-check form-check-sm form-check-custom form-check-solid me-5 me-lg-20'>
                                            <CheckboxUnstyledField
                                              name={`permissions[${index}][${canCreate.name}]`}
                                              label={canCreate.label}
                                            />
                                          </label>
                                          <label className='form-check form-check-custom form-check-solid me-5 me-lg-20'>
                                            <CheckboxUnstyledField
                                              name={`permissions[${index}][${canRetrieve.name}]`}
                                              label={canRetrieve.label}
                                            />
                                          </label>
                                          <label className='form-check form-check-custom form-check-solid'>
                                            <CheckboxUnstyledField
                                              name={`permissions[${index}][${canUpdate.name}]`}
                                              label={canUpdate.label}
                                            />
                                          </label>
                                        </div>
                                      </td>
                                    </tr>
                                  )
                                })}
                            </>
                          )}
                        />
                      </tbody>
                    </table>
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
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </Form>
          </BlockUi>
        )
      }}
    </Formik>
  )
}

export default RolePermissionsUpdateForm

import clsx from 'clsx'
import {useParams} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {useState, useEffect, useRef} from 'react'
import {Formik, Form, FieldArray} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import BlockUi from '@availity/block-ui'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {useUserBranchesUpdate} from '@/features/users/stores/UserUpdateBranchesProvider'
import {arrayObjectToSelectOptions} from '@/utils/arrayToSelectOptions'
import {
  useUserInfoQueryData,
  useUserInfoQueryContext,
} from '@/features/users/stores/UserInfoQueryProvider'
import {updateBranchAssignments} from '@/features/users/api'
import SelectInputFieldNonFormik from '@/components/elements/Input/SelectInputFieldNonFormik'
import userBranchesFormModel from '@/features/users/models/UserInfo/UserBranch/userBranchesFormModel'
import userBranchesInitialValues from '@/features/users/models/UserInfo/UserBranch/userBranchesInitialValues'
import userBranchesSchema from '@/features/users/models/UserInfo/UserBranch/userBranchesSchema'

const UserBranchesUpdateForm = () => {
  const searchParams = useParams()
  const intl = useIntl()
  const swal = withReactContent(Swal)
  const {toggleModal} = useModalContext()
  const userInfo = useUserInfoQueryData()
  const {refetch} = useUserInfoQueryContext()
  const [initialUserBranches, setInitialUserBranches] = useState(userBranchesInitialValues)
  const {branches} = useUserBranchesUpdate()
  const [selectedBranch, setSelectedBranch] = useState(undefined)
  const [disableAddBranch, setDisableAddBranch] = useState(true)
  const arrayHelpersRef = useRef(null)
  const formikActions = useRef(null)

  const {
    formId,
    formField: {
      userId,
      branch: [branchId],
    },
  } = userBranchesFormModel

  useEffect(() => {
    if (userInfo) {
      setInitialUserBranches((prevState) => {
        return {
          ...prevState,
          userId: searchParams.userId,
          branch: userInfo.branchAssignment.branch,
        }
      })
    }
  }, [userInfo])

  const [branchesOptions, setBranchesOptions] = useState([])
  useEffect(() => {
    if (branches) {
      console.log(branches)
      setBranchesOptions(
        arrayObjectToSelectOptions(branches, 'branchId', 'branchName', 'Select Branch')
      )
    }
  }, [branches])

  const addBranch = () => {
    const branchToAdd = branches
      .filter((branch) => branch.branchId == selectedBranch)
      .reduce((acc, branch) => {
        return {
          branchId: branch.branchId,
          branchName: branch.branchName,
        }
      })
    const found = formikActions.current.values.branch.some(
      (branch) => branch.branchId == branchToAdd.branchId
    )
    if (!found) {
      arrayHelpersRef.current.push(branchToAdd)
    } else {
      toast.error('Branch already added')
    }
  }

  useEffect(() => {
    if (selectedBranch) {
      setDisableAddBranch(false)
    }
  }, [selectedBranch])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    console.log(values)
    swal
      .fire({
        title: 'Update Branch Assignments?',
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
            const {data: response} = await updateBranchAssignments(values)
            swal.fire('Branch Assignments Updated!', response.detail, 'success')
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
      validationSchema={userBranchesSchema}
      initialValues={initialUserBranches}
      onSubmit={submit}
    >
      {(actions) => {
        formikActions.current = actions
        return (
          <BlockUi blocking={actions.isSubmitting} message='Updating Order'>
            <Form id={formId} className='form'>
              <div className='d-flex flex-column scroll-y me-n7 pe-4'>
                <div className='mb-0'>
                  <h5 className='mb-4'>Branches:</h5>
                  <div className='row mb-7'>
                    <div className='col-6'>
                      <div className='d-flex align-self-center'>
                        <div className='flex-grow-1 me-3'>
                          <SelectInputFieldNonFormik
                            setValue={setSelectedBranch}
                            data={branchesOptions}
                          />
                        </div>
                        <button
                          onClick={() => addBranch()}
                          type='button'
                          className='btn btn-icon btn-light btn-active-icon-primary flex-shrink-0'
                          disabled={disableAddBranch}
                        >
                          <CustomSVG path='/media/icons/actions/add.svg' className='svg-icon-1' />
                        </button>
                      </div>
                    </div>
                  </div>
                  <FieldArray
                    name='branch'
                    render={(arrayHelpers) => {
                      arrayHelpersRef.current = arrayHelpers
                      return (
                        <div className='table-responsive'>
                          <table className='table align-middle table-row-dashed fs-6 gy-4 mb-0'>
                            <thead>
                              <tr className='border-bottom border-gray-200 text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0'>
                                <th>Branch Name</th>
                                <th className='text-center'>Actions</th>
                              </tr>
                            </thead>
                            <tbody className='fw-semibold text-gray-800'>
                              {actions.values.branch.length > 0 ? (
                                actions.values.branch.map((detail, index) => {
                                  return (
                                    <tr key={detail.branchId}>
                                      <td>{detail.branchName}</td>
                                      <td className='text-center'>
                                        <button
                                          onClick={() => arrayHelpers.remove(index)}
                                          type='button'
                                          className='btn btn-icon btn-active-icon-danger btn-light btn-sm border-0 me-2'
                                        >
                                          <CustomSVG
                                            path='/media/icons/actions/close.svg'
                                            className='svg-icon-2'
                                          />
                                        </button>
                                      </td>
                                    </tr>
                                  )
                                })
                              ) : (
                                <tr>
                                  <td colSpan={4} className='text-center'>
                                    No Branches added
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )
                    }}
                  />
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

export default UserBranchesUpdateForm

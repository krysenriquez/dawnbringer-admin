import {useState, useEffect} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {updateBranch} from '../../api'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {
  useBranchInfoQueryData,
  useBranchInfoQueryLoading,
  useBranchInfoQueryContext,
} from '../../stores/BranchesInfoQueryProvider'
import InputField from '@/components/elements/Input/InputField'
import CheckboxField from '@/components/elements/Input/CheckboxField'
import branchFormModel from '../../models/branchFormModel'
import branchFormSchema from '../../models/branchFormSchema'
import branchInitialValues from '../../models/branchInitialValues'

const BranchEditForm = () => {
  const {toggleModal} = useModalContext()
  const {refetch} = useBranchInfoQueryContext()
  const swal = withReactContent(Swal)

  const branchInfo = useBranchInfoQueryData()
  const isLoading = useBranchInfoQueryLoading()

  const [initialBranch, setInitialBranch] = useState(branchInitialValues)
  const {
    formId,
    formField: {
      branchName,
      address1,
      address2,
      city,
      zip,
      province,
      country,
      phone,
      emailAddress,
      canDeliver,
      canSupply,
      isActive,
    },
  } = branchFormModel

  useEffect(() => {
    if (branchInfo) {
      setInitialBranch((prevState) => {
        return {...prevState, ...branchInfo}
      })
    }
  }, [branchInfo])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Update Branch?',
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
            const {data: response} = await updateBranch(values)
            swal.fire('Branch Updated', response.detail, 'success')
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
    <>
      {branchInfo && !isLoading && (
        <Formik
          enableReinitialize={true}
          validationSchema={branchFormSchema}
          initialValues={initialBranch}
          onSubmit={submit}
        >
          {(actions) => (
            <Form id={formId} className='form'>
              <div className='d-flex flex-column scroll-y me-n7 pe-4'>
                <div className='row mb-7'>
                  <div className='col'>
                    <InputField
                      className='form-control'
                      name={branchName.name}
                      label={branchName.label}
                      required
                    />
                  </div>
                </div>
                <div className='row mb-7'>
                  <div className='col-6'>
                    <InputField
                      className='form-control'
                      name={address1.name}
                      label={address1.label}
                    />
                  </div>
                  <div className='col-6'>
                    <InputField
                      className='form-control'
                      name={address2.name}
                      label={address2.label}
                    />
                  </div>
                </div>
                <div className='row mb-7'>
                  <div className='col-6'>
                    <InputField className='form-control' name={city.name} label={city.label} />
                  </div>
                  <div className='col-6'>
                    <InputField className='form-control' name={zip.name} label={zip.label} />
                  </div>
                </div>
                <div className='row mb-7'>
                  <div className='col-6'>
                    <InputField
                      className='form-control'
                      name={province.name}
                      label={province.label}
                    />
                  </div>
                  <div className='col-6'>
                    <InputField
                      className='form-control'
                      name={country.name}
                      label={country.label}
                    />
                  </div>
                </div>
                <div className='row mb-7'>
                  <div className='col-6'>
                    <InputField
                      className='form-control'
                      name={phone.name}
                      label={phone.label}
                      required
                    />
                  </div>
                  <div className='col-6'>
                    <InputField
                      className='form-control'
                      name={emailAddress.name}
                      label={emailAddress.label}
                      required
                    />
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <div className='mb-7'>
                      <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                        <span>Set branch to be able to deliver?</span>
                      </label>
                      <label className='form-check form-switch form-check-custom form-check-solid'>
                        <CheckboxField name={canDeliver.name} label={canDeliver.label} required />
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <div className='mb-7'>
                      <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                        <span>Set branch to be able to supply to other branches?</span>
                      </label>
                      <label className='form-check form-switch form-check-custom form-check-solid'>
                        <CheckboxField name={canSupply.name} label={canSupply.label} required />
                      </label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-6'>
                    <div className='mb-7'>
                      <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                        <span>Set branch status to Active?</span>
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
      )}
    </>
  )
}

export default BranchEditForm

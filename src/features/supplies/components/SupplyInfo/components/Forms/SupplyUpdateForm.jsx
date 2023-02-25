import clsx from 'clsx'
import {useParams} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {useState, useEffect} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import BlockUi from '@availity/block-ui'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {
  useSupplyInfoQueryData,
  useSupplyInfoQueryContext,
} from '@/features/supplies/stores/SupplyInfoQueryProvider'
import {updateSupply} from '@/features/supplies/api'
import InputField from '@/components/elements/Input/InputField'
import TextAreaField from '@/components/elements/Input/TextAreaField'
import processSupplyFormModel from '@/features/supplies/models/SupplyInfo/SupplyUpdate/processSupplyUpdateFormModel'
import processSupplyInitialValues from '@/features/supplies/models/SupplyInfo/SupplyUpdate/processSupplyUpdateInitialValues'
import processSupplySchema from '@/features/supplies/models/SupplyInfo/SupplyUpdate/processSupplyUpdateSchema'

const SupplyUpdateForm = () => {
  const searchParams = useParams()
  const intl = useIntl()
  const swal = withReactContent(Swal)
  const {toggleModal} = useModalContext()
  const {refetch} = useSupplyInfoQueryContext()
  const supplyInfo = useSupplyInfoQueryData()
  const [initialSupply, setInitialSupply] = useState(processSupplyInitialValues)

  const {
    formId,
    formField: {supplyId, referenceNumber, carrier, carrierContactNumber, trackingNumber, comment},
  } = processSupplyFormModel

  useEffect(() => {
    if (supplyInfo) {
      setInitialSupply((prevState) => {
        return {
          ...prevState,
          supplyId: searchParams.supplyId,
          referenceNumber: supplyInfo.referenceNumber,
          carrier: supplyInfo.carrier,
          carrierContactNumber: supplyInfo.carrierContactNumber,
          trackingNumber: supplyInfo.trackingNumber,
          comment: supplyInfo.comment,
        }
      })
    }
  }, [supplyInfo])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Update Supply?',
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
            const {data: response} = await updateSupply(values)
            swal.fire('Supply Updated!', response.detail, 'success')
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
      validationSchema={processSupplySchema}
      initialValues={initialSupply}
      onSubmit={submit}
    >
      {(actions) => (
        <BlockUi blocking={actions.isSubmitting} message='Updating Order'>
          <Form id={formId} className='form'>
            <div className='d-flex flex-column scroll-y me-n7 pe-4'>
              <div className='row mb-7'>
                <div className='col-12'>
                  <InputField
                    className='form-control'
                    name={referenceNumber.name}
                    label={referenceNumber.label}
                  />
                </div>
              </div>
              <div className='row mb-7'>
                <div className='col-12'>
                  <InputField className='form-control' name={carrier.name} label={carrier.label} />
                </div>
              </div>
              <div className='row mb-7'>
                <div className='col-12'>
                  <InputField
                    className='form-control'
                    name={carrierContactNumber.name}
                    label={carrierContactNumber.label}
                  />
                </div>
              </div>
              <div className='row mb-7'>
                <div className='col-12'>
                  <InputField
                    className='form-control'
                    name={trackingNumber.name}
                    label={trackingNumber.label}
                  />
                </div>
              </div>
              <div className='row mb-7'>
                <div className='col-12'>
                  <TextAreaField
                    className='form-control'
                    name={comment.name}
                    label={comment.label}
                  />
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
      )}
    </Formik>
  )
}

export default SupplyUpdateForm

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
  useOrderInfoQueryData,
  useOrderInfoQueryContext,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import {processOrderStatus, getOrderStatuses} from '@/features/orders/api'
import SelectField from '@/components/elements/Input/SelectField'
import TextAreaField from '@/components/elements/Input/TextAreaField'
import CheckboxField from '@/components/elements/Input/CheckboxField'
import processOrderStatusFormModel from '@/features/orders/models/processOrderStatusFormModel'
import processOrderStatusInitialValues from '@/features/orders/models/processOrderStatusInitialValues'
import processOrderStatusSchema from '@/features/orders/models/processOrderStatusSchema'

const OrderStatusForm = () => {
  const searchParams = useParams()
  const intl = useIntl()
  const swal = withReactContent(Swal)
  const {toggleModal} = useModalContext()
  const {refetch} = useOrderInfoQueryContext()
  const orderInfo = useOrderInfoQueryData()
  const [initialOrderStatus, setInitialOrderStatus] = useState(processOrderStatusInitialValues)
  const [orderStatuses, setOrderStatuses] = useState([])

  const {
    formId,
    formField: {orderStatus, comment, emailSent},
  } = processOrderStatusFormModel

  const constructObjectFromEnums = (enums) => {
    let return_arr = [
      {
        value: '',
        label: 'Select Order Status',
      },
    ]

    enums.map((arr) => {
      return_arr.push({value: arr, label: intl.formatMessage({id: arr})})
    })

    return return_arr
  }

  const handleGetOrderStatuses = async (order) => {
    await getOrderStatuses({
      orderStatus: order.currentOrderStatus,
      orderType: order.orderType,
    }).then((response) => {
      setOrderStatuses(constructObjectFromEnums(response.data.statuses))
    })
  }

  useEffect(() => {
    if (orderInfo) {
      setInitialOrderStatus((prevState) => {
        return {...prevState, orderId: searchParams.orderId}
      })
      handleGetOrderStatuses(orderInfo)
    }
  }, [orderInfo])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    swal
      .fire({
        title: 'Update Order Status?',
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
            const {data: response} = await processOrderStatus(values)
            swal.fire('Order Updated', response.detail, 'success')
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
      validationSchema={processOrderStatusSchema}
      initialValues={initialOrderStatus}
      onSubmit={submit}
    >
      {(actions) => (
        <BlockUi blocking={actions.isSubmitting} message='Updating Order'>
          <Form id={formId} className='form'>
            <div className='d-flex flex-column scroll-y me-n7 pe-4'>
              <div className='row mb-7'>
                <div className='col-12'>
                  <SelectField
                    className='form-select'
                    name={orderStatus.name}
                    label={orderStatus.label}
                    data={orderStatuses}
                    required
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
              <div className='row mb-7'>
                <div className='col-12'>
                  <CheckboxField name={emailSent.name} label={emailSent.label} />
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

export default OrderStatusForm

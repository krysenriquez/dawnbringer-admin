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
import {useOrderStatus} from '@/features/orders/stores/OrderStatusProvider'
import {processOrderStatus, getOrderStatuses} from '@/features/orders/api'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
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
  const orderInfo = useOrderInfoQueryData()
  const {refetch} = useOrderInfoQueryContext()
  const {orderStatuses, orderStocks} = useOrderStatus()
  const [initialOrderStatus, setInitialOrderStatus] = useState(processOrderStatusInitialValues)

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

  const [orderStatusesOptions, setOrderStatusesOptions] = useState([])
  useEffect(() => {
    if (orderStatuses) {
      setOrderStatusesOptions(constructObjectFromEnums(orderStatuses.statuses))
    }
  }, [orderStatuses])

  const [orderStocksDetails, setOrderStocksDetails] = useState([])
  const [hasNoStock, setHasNoStock] = useState(false)
  useEffect(() => {
    if (orderStocks) {
      setOrderStocksDetails(orderStocks.detail)
      setHasNoStock(orderStocks.hasNoStock)
    }
  }, [orderStocks])

  useEffect(() => {
    if (orderInfo) {
      setInitialOrderStatus((prevState) => {
        return {...prevState, orderId: searchParams.orderId}
      })
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
    <>
      <div
        className={clsx('notice d-flex align-items-center rounded border border-dashed mb-4 p-2', {
          'bg-light-danger border-danger': hasNoStock,
          'bg-light-warning border-warning': !hasNoStock,
        })}
      >
        <CustomSVG
          path='/media/icons/general/exclamation.svg'
          className={clsx('svg-icon svg-icon-1 me-2 ms-2', {
            'svg-icon-danger': hasNoStock,
            'svg-icon-warning': !hasNoStock,
          })}
        />
        <div className='d-flex flex-stack flex-grow-1'>
          <div className='fw-semibold lh-sm'>
            {orderStocksDetails ? (
              orderStocksDetails.map((detail) => {
                return (
                  <div className='text-gray-700 fw-bold' key={detail}>
                    {detail}
                  </div>
                )
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
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
                      data={orderStatusesOptions}
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
    </>
  )
}

export default OrderStatusForm

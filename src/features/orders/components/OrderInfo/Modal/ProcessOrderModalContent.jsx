import clsx from 'clsx'
import {useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {toast} from 'react-toastify'
import {useOrderInfoQueryContext} from '../OrderInfoQueryProvider'
import {postOrderHistory} from '@/features/orders/api'

const processOrderSchema = Yup.object().shape({
  order_status: Yup.string().required('Order Status is required'),
  comment: Yup.string().required('Comment is required'),
})

const ProcessOrderModalForm = ({order, handleClick}) => {
  const {refetch} = useOrderInfoQueryContext()

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    handleClick()
  }

  const [orderHistory] = useState({
    order_status: '',
    comment: '',
    order_number: order.order_number,
  })

  const formik = useFormik({
    initialValues: orderHistory,
    validationSchema: processOrderSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
      try {
        await postOrderHistory(values)
        toast.success('Order Updated!')
      } catch (ex) {
        console.error(ex)
      } finally {
        setSubmitting(true)
        cancel(true)
      }
    },
  })

  return (
    <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
      <form id='process_roder_form' className='form' onSubmit={formik.handleSubmit} noValidate>
        <div
          className='d-flex flex-column scroll-y me-n7 pe-7'
          id='kt_modal_add_user_scroll'
          data-scroll='true'
          data-scroll-activate='{default: false, lg: true}'
          data-scroll-max-height='auto'
          data-scroll-dependencies='#kt_modal_add_user_header'
          data-scroll-wrappers='#kt_modal_add_user_scroll'
          data-scroll-offset='300px'
        >
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Order Status</label>
            <select
              placeholder='Order Status'
              {...formik.getFieldProps('order_status')}
              name='order_status'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.order_status && formik.errors.order_status},
                {
                  'is-valid': formik.touched.order_status && !formik.errors.order_status,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting}
              value={order.latest_order_status}
            >
              <option value='PENDING'>Pending</option>
              <option value='AWAITING_DELIVERY'>Awaiting Delivery</option>
              <option value='AWAITING_PICKUP'>Awaiting Pickup</option>
              <option value='ON_DELIVERY'>On Delivery</option>
              <option value='CANCELLED'>Cancelled</option>
              <option value='COMPLETED'>Completed</option>
              <option value='REFUNDED'>Refunded</option>
            </select>
            {formik.touched.order_status && formik.errors.order_status && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.order_status}</span>
                </div>
              </div>
            )}
          </div>
          <div className='fv-row mb-7'>
            <label className='required fw-bold fs-6 mb-2'>Comment</label>
            <input
              placeholder='Comment'
              {...formik.getFieldProps('comment')}
              type='text'
              name='comment'
              className={clsx(
                'form-control form-control-solid mb-3 mb-lg-0',
                {'is-invalid': formik.touched.comment && formik.errors.comment},
                {
                  'is-valid': formik.touched.comment && !formik.errors.comment,
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting}
            />
            {formik.touched.comment && formik.errors.comment && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.comment}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='text-center pt-15'>
          <button
            type='reset'
            onClick={() => cancel()}
            className='btn btn-light me-3'
            disabled={formik.isSubmitting}
          >
            Discard
          </button>
          <button
            type='submit'
            className='btn btn-primary'
            data-users-modal-action='submit'
            disabled={formik.isSubmitting || !formik.isValid || !formik.touched}
          >
            <span className='indicator-label'>Submit</span>
            {formik.isSubmitting && (
              <span className='indicator-progress'>
                Please wait...{' '}
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
      </form>
      {formik.isSubmitting}
    </div>
  )
}

export {ProcessOrderModalForm}

import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import clsx from 'clsx'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'

const OrderSteps = () => {
  const [steps, setSteps] = useState([])
  const intl = useIntl()
  const orderInfo = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  useEffect(() => {
    if (orderInfo.histories) {
      const sortedSteps = [...orderInfo.histories].sort((a, b) =>
        a.orderStage > b.orderStage ? 1 : -1
      )
      for (var i = 0; i < 4; i++) {
        if (i < orderInfo.currentOrderStage) {
          sortedSteps[i].orderStage == orderInfo.currentOrderStage
            ? sortedSteps[i].orderStage == 4
              ? (sortedSteps[i].stage = 'completed')
              : (sortedSteps[i].stage = 'current')
            : (sortedSteps[i].stage = 'completed')
        } else {
          sortedSteps[i] = {
            orderStage: i + 1,
            order_status: '',
            stage: '',
          }
        }
      }
      setSteps(sortedSteps)
    }
  }, [orderInfo])

  return (
    <>
      {orderInfo && orderInfo.histories && !isLoading ? (
        <div className='stepper stepper-pills'>
          <div className='stepper-nav flex-center flex-wrap'>
            {steps ? (
              steps.map((step) => {
                return (
                  <div
                    className={clsx('stepper-item mx-8 my-4', {
                      current: step.stage == 'current',
                      completed: step.stage == 'completed',
                    })}
                    key={step.orderStage}
                  >
                    <div className='stepper-wrapper d-flex align-items-center'>
                      <div className='stepper-icon w-40px h-40px'>
                        <i className='stepper-check fas fa-check' />
                        <span className='stepper-number'>{step.orderStage}</span>
                      </div>
                      <div className='stepper-label'>
                        <h3 className='stepper-title'>
                          {step.orderStatus ? intl.formatMessage({id: step.orderStatus}) : ''}
                        </h3>
                      </div>
                    </div>
                    <div className='stepper-line h-40px' />
                  </div>
                )
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
export default OrderSteps

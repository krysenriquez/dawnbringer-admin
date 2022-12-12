import {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import clsx from 'clsx'

const OrderProcess = ({order}) => {
  const [data, setData] = useState(order)
  const [steps, setSteps] = useState([])
  const intl = useIntl()

  useEffect(() => {
    setData(order)
  }, [order])

  useEffect(() => {
    const sortedSteps = data.histories.sort((a, b) => (a.order_stage > b.order_stage ? 1 : -1))
    for (var i = 0; i < 4; i++) {
      if (i < data.latest_order_stage) {
        sortedSteps[i].order_stage == data.latest_order_stage
          ? (sortedSteps[i].stage = 'current')
          : (sortedSteps[i].stage = 'completed')
      } else {
        sortedSteps[i] = {
          order_stage: i + 1,
          order_status: '',
          stage: '',
        }
      }
    }
    console.log(sortedSteps)
    setSteps(sortedSteps)
  }, [data])

  return (
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
                key={step.order_stage}
              >
                <div className='stepper-wrapper d-flex align-items-center'>
                  <div className='stepper-icon w-40px h-40px'>
                    <i className='stepper-check fas fa-check' />
                    <span className='stepper-number'>{step.order_stage}</span>
                  </div>
                  <div className='stepper-label'>
                    <h3 className='stepper-title'>
                      {step.order_status ? intl.formatMessage({id: step.order_status}) : ''}
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
  )
}
export {OrderProcess}

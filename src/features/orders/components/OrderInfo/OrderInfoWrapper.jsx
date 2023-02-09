import {useMemo} from 'react'
import {
  OrderInfoQueryProvider,
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from './OrderInfoQueryProvider'
import {OrderInfo} from './OrderInfo'
import {Loading} from '@/components/elements/Loading/Loading'

const OrderInfoPage = () => {
  const isLoading = useOrderInfoQueryLoading()
  const order = useOrderInfoQueryData()
  const data = useMemo(() => order, [order])

  return <>{isLoading ? <Loading /> : <OrderInfo order={data} />}</>
}

const OrderInfoWrapper = () => {
  return (
    <>
      <OrderInfoQueryProvider>
        <OrderInfoPage />
      </OrderInfoQueryProvider>
    </>
  )
}

export {OrderInfoWrapper}

import {useMemo} from 'react'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import {CustomCard} from '@/components/elements/Card'
import {
  OrderInfoQueryProvider,
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from './OrderInfo/OrderInfoQueryProvider'
import {OrderInfo} from './OrderInfo/OrderInfo'
import {Loading} from '@/components/elements/Loading/Loading'

const OrderInfoPage = () => {
  const isLoading = useOrderInfoQueryLoading()
  const order = useOrderInfoQueryData()
  const data = useMemo(() => order, [order])

  return <>{isLoading ? <Loading /> : <OrderInfo order={data} />}</>
}

const OrderInfoWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]} description='Order Info'>
        {intl.formatMessage({id: 'MENU.ORDERS'})}
      </PageTitle>
      <OrderInfoQueryProvider>
        <OrderInfoPage />
      </OrderInfoQueryProvider>
    </>
  )
}

export {OrderInfoWrapper}

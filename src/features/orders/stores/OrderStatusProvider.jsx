import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import {useBranch} from '@/providers/BranchProvider'
import {getOrderStatuses, getOrderStocks} from '@/features/orders/api'

const OrderStatusContext = createContext({
  orderStatuses: undefined,
  orderStocks: undefined,
})

const useOrderStatus = () => {
  return useContext(OrderStatusContext)
}

const OrderStatusProvider = ({children}) => {
  const {defaultBranch} = useBranch()
  const orderInfo = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()
  const didRequestOrderStatus = useRef(false)
  const [orderStatuses, setOrderStatuses] = useState(undefined)
  const didRequestOrderStocks = useRef(false)
  const [orderStocks, setOrderStocks] = useState(undefined)

  useEffect(() => {
    if (orderInfo && !isLoading) {
      const requestOrderStatuses = async () => {
        try {
          if (!didRequestOrderStatus.current) {
            const data = await getOrderStatuses()
            if (data) {
              setOrderStatuses(data)
            }
          }
        } catch (error) {
          if (!didRequestOrderStatus.current) {
            toast.error('Unable to fetch Order Statuses')
          }
        }

        return () => (didRequestOrderStatus.current = true)
      }

      const requestOrderStocks = async () => {
        try {
          if (!didRequestOrderStocks.current) {
            const data = await getOrderStocks({
              orderId: orderInfo.orderId,
              branchId: defaultBranch.branchId,
            })
            if (data) {
              setOrderStocks(data)
            }
          }
        } catch (error) {
          if (!didRequestOrderStocks.current) {
            toast.error('Unable to fetch Order Stocks')
          }
        }

        return () => (didRequestOrderStocks.current = true)
      }

      requestOrderStatuses()
      requestOrderStocks()
    }
  }, [orderInfo, isLoading])

  return (
    <OrderStatusContext.Provider
      value={{
        orderStatuses,
        orderStocks,
      }}
    >
      {children}
    </OrderStatusContext.Provider>
  )
}

export {OrderStatusProvider, useOrderStatus}

import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {useBranch} from '@/providers/BranchProvider'
import {
  getOrdersCountSummary,
  getOrdersSalesSummary,
  getTotalSalesSummary,
  getVariantsQuantitySold,
  getVariantTotalSales,
  getPendingOrdersList,
  getVariantStocksList,
  getCustomersCount,
  getMembersCount,
  getOrdersCount,
  getTotalSales,
} from '../api'

const DashboardContext = createContext({
  period: undefined,
  ordersCountSummary: undefined,
  totalSalesSummary: undefined,
  variantsQuantitySold: undefined,
  variantTotalSales: undefined,
  orderSalesSummary: undefined,
  pendingOrdersList: undefined,
  variantStocksList: undefined,
  customersCount: undefined,
  membersCount: undefined,
  ordersCount: undefined,
  totalSales: undefined,
  setPeriod: (any) => {},
})

const useDashboard = () => {
  return useContext(DashboardContext)
}

const DashboardProvider = ({children}) => {
  const {defaultBranch} = useBranch()
  const [period, setPeriod] = useState(undefined)

  const didRequestOrderSalesSummary = useRef(false)
  const [orderSalesSummary, setOrderSalesSummary] = useState(undefined)

  const didRequestOrdersCountSummary = useRef(false)
  const [ordersCountSummary, setOrdersCountSummary] = useState(undefined)

  const didRequestTotalSalesSummary = useRef(false)
  const [totalSalesSummary, setTotalSalesSummary] = useState(undefined)

  const didRequestVariantsQuantitySold = useRef(false)
  const [variantsQuantitySold, setVariantsQuantitySold] = useState(undefined)

  const didRequestVariantTotalSales = useRef(false)
  const [variantTotalSales, setVariantTotalSales] = useState(undefined)

  const didRequestPendingOrdersList = useRef(false)
  const [pendingOrdersList, setPendingOrdersList] = useState(undefined)

  const didRequestVariantStocksList = useRef(false)
  const [variantStocksList, setVariantStocksList] = useState(undefined)

  const didRequestCustomersCount = useRef(false)
  const [customersCount, setCustomersCount] = useState(undefined)

  const didRequestMembersCount = useRef(false)
  const [membersCount, setMembersCount] = useState(undefined)

  const didRequestOrdersCount = useRef(false)
  const [ordersCount, setOrdersCount] = useState(undefined)

  const didRequestTotalSales = useRef(false)
  const [totalSales, setTotalSales] = useState(undefined)

  useEffect(() => {
    const requestOrderSalesSummary = async () => {
      try {
        if (!didRequestOrderSalesSummary.current) {
          const data = await getOrdersSalesSummary({
            branchId: defaultBranch.branchId,
            period: period,
          })
          if (data) {
            setOrderSalesSummary(data)
          }
        }
      } catch (error) {
        if (!didRequestOrderSalesSummary.current) {
          toast.error(error)
        }
      }

      return () => (didRequestOrderSalesSummary.current = true)
    }

    const requestOrdersCountSummary = async () => {
      try {
        if (!didRequestOrdersCountSummary.current) {
          const data = await getOrdersCountSummary({
            branchId: defaultBranch.branchId,
            period: period,
          })
          if (data.length > 0) {
            setOrdersCountSummary(data)
          }
        }
      } catch (error) {
        if (!didRequestOrdersCountSummary.current) {
          toast.error(error)
        }
      }

      return () => (didRequestOrdersCountSummary.current = true)
    }

    const requestTotalSalesSummary = async () => {
      try {
        if (!didRequestTotalSalesSummary.current) {
          const data = await getTotalSalesSummary({
            branchId: defaultBranch.branchId,
            period: period,
          })
          if (data) {
            setTotalSalesSummary(data)
          }
        }
      } catch (error) {
        if (!didRequestTotalSalesSummary.current) {
          toast.error(error)
        }
      }

      return () => (didRequestTotalSalesSummary.current = true)
    }

    const requestVariantsQuantitySold = async () => {
      try {
        if (!didRequestVariantsQuantitySold.current) {
          const data = await getVariantsQuantitySold({
            branchId: defaultBranch.branchId,
            period: period,
          })
          if (data.length > 0) {
            setVariantsQuantitySold(data)
          }
        }
      } catch (error) {
        if (!didRequestVariantsQuantitySold.current) {
          toast.error(error)
        }
      }

      return () => (didRequestVariantsQuantitySold.current = true)
    }

    const requestVariantTotalSales = async () => {
      try {
        if (!didRequestVariantTotalSales.current) {
          const data = await getVariantTotalSales({
            branchId: defaultBranch.branchId,
            period: period,
          })
          if (data.length > 0) {
            setVariantTotalSales(data)
          }
        }
      } catch (error) {
        if (!didRequestVariantTotalSales.current) {
          toast.error(error)
        }
      }

      return () => (didRequestVariantTotalSales.current = true)
    }

    const requestPendingOrdersList = async () => {
      try {
        if (!didRequestPendingOrdersList.current) {
          const data = await getPendingOrdersList(defaultBranch.branchId)
          if (data.length > 0) {
            setPendingOrdersList(data)
          }
        }
      } catch (error) {
        if (!didRequestPendingOrdersList.current) {
          toast.error(error)
        }
      }

      return () => (didRequestPendingOrdersList.current = true)
    }

    const requestVariantStocksList = async () => {
      try {
        if (!didRequestVariantStocksList.current) {
          const data = await getVariantStocksList(defaultBranch.branchId)
          if (data.length > 0) {
            setVariantStocksList(data)
          }
        }
      } catch (error) {
        if (!didRequestVariantStocksList.current) {
          toast.error(error)
        }
      }

      return () => (didRequestVariantStocksList.current = true)
    }

    const requestCustomersCount = async () => {
      try {
        if (!didRequestCustomersCount.current) {
          const data = await getCustomersCount({
            period: period,
          })
          if (data) {
            setCustomersCount(data)
          }
        }
      } catch (error) {
        if (!didRequestCustomersCount.current) {
          toast.error(error)
        }
      }

      return () => (didRequestCustomersCount.current = true)
    }
    const requestMembersCount = async () => {
      try {
        if (!didRequestMembersCount.current) {
          const data = await getMembersCount({
            period: period,
          })
          if (data) {
            setMembersCount(data)
          }
        }
      } catch (error) {
        if (!didRequestMembersCount.current) {
          toast.error(error)
        }
      }

      return () => (didRequestMembersCount.current = true)
    }
    const requestOrdersCount = async () => {
      try {
        if (!didRequestOrdersCount.current) {
          const data = await getOrdersCount({
            branchId: defaultBranch.branchId,
            period: period,
          })
          if (data) {
            setOrdersCount(data)
          }
        }
      } catch (error) {
        if (!didRequestOrdersCount.current) {
          toast.error(error)
        }
      }

      return () => (didRequestOrdersCount.current = true)
    }
    const requestTotalSales = async () => {
      try {
        if (!didRequestTotalSales.current) {
          const data = await getTotalSales({
            branchId: defaultBranch.branchId,
            period: period,
          })
          if (data) {
            setTotalSales(data)
          }
        }
      } catch (error) {
        if (!didRequestTotalSales.current) {
          toast.error(error)
        }
      }

      return () => (didRequestTotalSales.current = true)
    }

    if (defaultBranch && period) {
      requestOrderSalesSummary()
      requestOrdersCountSummary()
      // requestTotalSalesSummary()
      requestVariantsQuantitySold()
      requestVariantTotalSales()
      requestPendingOrdersList()
      requestVariantStocksList()
      requestCustomersCount()
      requestMembersCount()
      requestOrdersCount()
      requestTotalSales()
    }
  }, [defaultBranch, period])

  useEffect(() => {
    setPeriod('Day')
  }, [])

  return (
    <DashboardContext.Provider
      value={{
        orderSalesSummary,
        ordersCountSummary,
        totalSalesSummary,
        variantsQuantitySold,
        variantTotalSales,
        pendingOrdersList,
        variantStocksList,
        customersCount,
        membersCount,
        ordersCount,
        totalSales,
        period,
        setPeriod,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export {DashboardProvider, useDashboard}

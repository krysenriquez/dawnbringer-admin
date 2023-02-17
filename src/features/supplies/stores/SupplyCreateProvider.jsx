import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getBranches} from '@/features/branches/api'
import {getProductVariantOptions} from '@/features/product-variant/api'

const SupplyCreateContext = createContext({
  branches: undefined,
  productVariants: undefined,
})

const useSupplyCreate = () => {
  return useContext(SupplyCreateContext)
}

const SupplyCreateProvider = ({children}) => {
  const didRequestBranches = useRef(false)
  const [branches, setBranches] = useState(undefined)
  const didRequestProductVariants = useRef(false)
  const [productVariants, setProductVariants] = useState(undefined)

  useEffect(() => {
    const requestBranches = async () => {
      try {
        if (!didRequestBranches.current) {
          const data = await getBranches()
          if (data.length > 0) {
            setBranches(data)
          }
        }
      } catch (error) {
        if (!didRequestBranches.current) {
          toast.error('Unable to fetch Branches')
        }
      }

      return () => (didRequestBranches.current = true)
    }

    const requestProductVariant = async () => {
      try {
        if (!didRequestProductVariants.current) {
          const data = await getProductVariantOptions()
          if (data.length > 0) {
            setProductVariants(data)
          }
        }
      } catch (error) {
        if (!didRequestProductVariants.current) {
          toast.error('Unable to fetch Product Variants')
        }
      }

      return () => (didRequestProductVariants.current = true)
    }

    requestBranches()
    requestProductVariant()
  }, [])

  return (
    <SupplyCreateContext.Provider
      value={{
        branches,
        productVariants,
      }}
    >
      {children}
    </SupplyCreateContext.Provider>
  )
}

export {SupplyCreateProvider, useSupplyCreate}

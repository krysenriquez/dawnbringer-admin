import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getProductOptions} from '@/features/product/api'
import {getmembershiplevels} from '@/features/membership/api'

const ProductVariantCreateContext = createContext({
  products: undefined,
  membershipLevels: undefined,
})

const useProductVariantCreate = () => {
  return useContext(ProductVariantCreateContext)
}

const ProductVariantCreateProvider = ({children}) => {
  const didRequestProducts = useRef(false)
  const [products, setProducts] = useState(undefined)
  const didRequestMembershipLevels = useRef(false)
  const [membershipLevels, setMembershipLevels] = useState(undefined)

  useEffect(() => {
    const requestProducts = async () => {
      try {
        if (!didRequestProducts.current) {
          const data = await getProductOptions()
          if (data.length > 0) {
            setProducts(data)
          }
        }
      } catch (error) {
        if (!didRequestProducts.current) {
          toast.error('Unable to fetch Product Types')
        }
      }

      return () => (didRequestProducts.current = true)
    }

    const requestMembershipLevels = async () => {
      try {
        if (!didRequestMembershipLevels.current) {
          const data = await getmembershiplevels()
          if (data.length > 0) {
            setMembershipLevels(data)
          }
        }
      } catch (error) {
        if (!didRequestMembershipLevels.current) {
          toast.error('Unable to fetch Membership Levels')
        }
      }

      return () => (didRequestMembershipLevels.current = true)
    }

    requestProducts()
    requestMembershipLevels()
  }, [])

  return (
    <ProductVariantCreateContext.Provider
      value={{
        products,
        membershipLevels,
      }}
    >
      {children}
    </ProductVariantCreateContext.Provider>
  )
}

export {ProductVariantCreateProvider, useProductVariantCreate}

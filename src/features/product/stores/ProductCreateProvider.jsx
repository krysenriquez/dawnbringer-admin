import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getProductTypeOptions} from '@/features/product-type/api'

const ProductCreateContext = createContext({
  productTypes: undefined,
})

const useProductCreate = () => {
  return useContext(ProductCreateContext)
}

const ProductCreateProvider = ({children}) => {
  const didRequestProductTypes = useRef(false)
  const [productTypes, setProductTypes] = useState(undefined)

  useEffect(() => {
    const requestProductTypes = async () => {
      try {
        if (!didRequestProductTypes.current) {
          const data = await getProductTypeOptions()
          if (data.length > 0) {
            setProductTypes(data)
          }
        }
      } catch (error) {
        if (!didRequestProductTypes.current) {
          toast.error('Unable to fetch Product Types')
        }
      }

      return () => (didRequestProductTypes.current = true)
    }

    requestProductTypes()
  }, [])

  return (
    <ProductCreateContext.Provider
      value={{
        productTypes,
      }}
    >
      {children}
    </ProductCreateContext.Provider>
  )
}

export {ProductCreateProvider, useProductCreate}

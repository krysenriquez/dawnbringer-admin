import {
  useSupplyInfoQueryData,
  useSupplyInfoQueryLoading,
} from '../../stores/SupplyInfoQueryProvider'

const SupplyInfoPage = () => {
  const supply = useSupplyInfoQueryData()
  const isLoading = useSupplyInfoQueryLoading()

  return (
    <>
      {Object.keys(supply).length > 0 && !isLoading ? (
        <div className='d-flex flex-column flex-lg-row gap-7'>
          <div className='d-lg-flex flex-column flex-lg-row-auto w-100 w-lg-300px'>
            {/* <OrderStatus /> */}
          </div>
          <div className='flex-lg-row-fluid ms-lg-7 ms-xl-1 d-flex flex-column gap-7 gap-lg-10'>
            <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
              {/* <OrderDetails /> */}
              {/* <OrderCustomer /> */}
              {/* <OrderDocuments /> */}
            </div>
            <div className='d-flex flex-column gap-7 gap-lg-10'>
              <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
                {/* <OrderAddress /> */}
              </div>
              {/* <OrderTable /> */}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='text-center'>
            <h2>No Record Found</h2>
          </div>
        </>
      )}
    </>
  )
}

export default SupplyInfoPage

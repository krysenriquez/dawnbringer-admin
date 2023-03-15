import {useState} from 'react'
import CustomTabs from '@/components/elements/Tabs/CustomTabs'
import {Tab} from 'react-bootstrap'
import {
  useProductVariantInfoQueryData,
  useProductVariantInfoQueryLoading,
} from '@/features/product-variant/stores/ProductVariantInfoQueryProvider'
import ProductVariantDetails from './components/ProductVariantDetails'
import ProductVariantMedia from './components/ProductVariantMedia'
import ProductVariantSuppliesTable from './components/ProductVariantSupplies/ProductVariantSuppliesTable'
import ProductVariantOrdersTable from './components/ProductVariantOrders/ProductVariantOrdersTable'
import HistoriesTable from './components/Histories/HistoriesTable'

const ProductVariantInfoPage = () => {
  const productVariantInfo = useProductVariantInfoQueryData()
  const isLoading = useProductVariantInfoQueryLoading()
  const [tab, setTab] = useState('details')
  return (
    <>
      {Object.keys(productVariantInfo).length > 0 && !isLoading ? (
        <>
          <div className='form d-flex flex-column flex-lg-row'>
            <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
              <ProductVariantDetails />
            </div>
            <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
              <CustomTabs
                className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold'
                defaultActiveKey='details'
                activeKey={tab}
                onSelect={(k) => setTab(k)}
              >
                <Tab
                  eventKey='details'
                  title='Details'
                  className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'
                  tabClassName='text-active-primary'
                >
                  {tab == 'details' ? <ProductVariantMedia /> : <></>}
                </Tab>
                <Tab
                  eventKey='supplies'
                  title='Supplies'
                  className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'
                  tabClassName='text-active-primary'
                >
                  {tab == 'supplies' ? <ProductVariantSuppliesTable /> : <></>}
                </Tab>
                <Tab
                  eventKey='orders'
                  title='Orders'
                  className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'
                  tabClassName='text-active-primary'
                >
                  {tab == 'orders' ? <ProductVariantOrdersTable /> : <></>}
                </Tab>
                <Tab
                  eventKey='histories'
                  title='History'
                  className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'
                  tabClassName='text-active-primary'
                >
                  {tab == 'histories' ? <HistoriesTable /> : <></>}
                </Tab>
              </CustomTabs>
            </div>
          </div>
        </>
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

export default ProductVariantInfoPage

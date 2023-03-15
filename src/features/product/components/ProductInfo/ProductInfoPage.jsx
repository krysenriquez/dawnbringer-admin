import {useState} from 'react'
import CustomTabs from '@/components/elements/Tabs/CustomTabs'
import {Tab} from 'react-bootstrap'
import {
  useProductInfoQueryData,
  useProductInfoQueryLoading,
} from '../../stores/ProductInfoQueryProvider'
import ProductDetails from './components/ProductDetails'
import ProductVariantsTable from './components/ProductVariants/ProductVariantsTable'
import HistoriesTable from './components/Histories/HistoriesTable'

const ProductInfoPage = () => {
  const productInfo = useProductInfoQueryData()
  const isLoading = useProductInfoQueryLoading()
  const [tab, setTab] = useState('variants')

  return (
    <>
      {Object.keys(productInfo).length > 0 && !isLoading ? (
        <>
          <div className='form d-flex flex-column flex-lg-row'>
            <div className='d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10'>
              <ProductDetails />
            </div>
            <div className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'>
              <CustomTabs
                className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold'
                defaultActiveKey='variants'
                activeKey={tab}
                onSelect={(k) => setTab(k)}
              >
                <Tab
                  eventKey='variants'
                  title='Variants'
                  className='d-flex flex-column flex-row-fluid gap-7 gap-lg-10'
                  tabClassName='text-active-primary'
                >
                  {tab == 'variants' ? <ProductVariantsTable /> : <></>}
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

export default ProductInfoPage

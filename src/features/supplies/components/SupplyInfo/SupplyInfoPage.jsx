import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomTabs from '@/components/elements/Tabs/CustomTabs'
import {Tab} from 'react-bootstrap'
import {
  useSupplyInfoQueryData,
  useSupplyInfoQueryLoading,
} from '../../stores/SupplyInfoQueryProvider'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import SupplyStatus from './components/SupplyStatus'
import SupplyDetails from './components/SupplyDetails'
import SupplyDelivery from './components/SupplyDelivery'
import SupplyBranchFrom from './components/SupplyBranchFrom'
import SupplyBranchTo from './components/SupplyBranchTo'
import SupplyTable from './components/SupplyTable'
import SupplyUpdateForm from './components/Forms/SupplyUpdateForm'
import HistoriesTable from './components/Histories/HistoriesTable'

const ProcessSupplyUpdate = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-500px',
    title: 'Update Supply',
  }

  return (
    <CustomModal {...value}>
      <SupplyUpdateForm />
    </CustomModal>
  )
}

const SupplyInfoPage = () => {
  const navigate = useNavigate()
  const supplyInfo = useSupplyInfoQueryData()
  const isLoading = useSupplyInfoQueryLoading()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tab, setTab] = useState('details')

  const cancel = () => {
    navigate(`/supplies`)
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {Object.keys(supplyInfo).length > 0 && !isLoading ? (
        <div className='d-flex flex-column flex-lg-row gap-7'>
          <div className='d-lg-flex flex-column flex-lg-row-auto w-100 w-lg-300px'>
            <SupplyStatus />
          </div>
          <div className='flex-lg-row-fluid ms-lg-7 ms-xl-1 d-flex flex-column gap-7 gap-lg-10'>
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
                {tab == 'details' ? (
                  <>
                    <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
                      <SupplyDetails />
                      <SupplyDelivery />
                    </div>
                    <div className='d-flex flex-column gap-7 gap-lg-10'>
                      <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
                        <SupplyBranchFrom />
                        <SupplyBranchTo />
                      </div>
                      <SupplyTable />
                      {supplyInfo.currentSupplyStage < 5 && supplyInfo.canUpdateSupplyStatus && (
                        <div className='d-flex justify-content-end'>
                          <button
                            type='reset'
                            onClick={() => cancel()}
                            className='btn btn-light me-3'
                          >
                            Cancel
                          </button>
                          <button
                            type='reset'
                            onClick={() => toggleModal()}
                            className='btn btn-primary'
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
      ) : (
        <>
          <div className='text-center'>
            <h2>No Record Found</h2>
          </div>
        </>
      )}
      {isModalOpen && <ProcessSupplyUpdate isModalOpen={isModalOpen} toggleModal={toggleModal} />}
    </>
  )
}

export default SupplyInfoPage

import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {
  usePageContentsListQueryData,
  usePageContentsListQueryLoading,
} from '@/features/website/stores/PageContents/PageContentsListQueryProvider'
import pageContentsColumn from './PageContentsListColumn'
import PageContentCreateForm from '../PageContentCreate/PageContentCreateForm'

const ProcessPageContentCreate = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Create Page Content',
  }

  return (
    <CustomModal {...value}>
      <PageContentCreateForm />
    </CustomModal>
  )
}

const PageContentsListTable = () => {
  const navigate = useNavigate()
  const pageContents = usePageContentsListQueryData()
  const isLoading = usePageContentsListQueryLoading()
  const tableData = useMemo(() => pageContents, [pageContents])
  const tableColumns = useMemo(() => pageContentsColumn, [])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolbar: true,
              toolbarButtonName: 'Add Page Content',
              handleToolbarButtonClick: toggleModal,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
        {isModalOpen && (
          <ProcessPageContentCreate isModalOpen={isModalOpen} toggleModal={toggleModal} />
        )}
      </CustomCardWithoutHeader>
    </>
  )
}

export default PageContentsListTable

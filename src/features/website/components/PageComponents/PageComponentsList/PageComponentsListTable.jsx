import {useMemo, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {
  usePageComponentsListQueryData,
  usePageComponentsListQueryLoading,
} from '@/features/website/stores/PageComponents/PageComponentsListQueryProvider'
import {PageComponentCreateProvider} from '@/features/website/stores/PageComponents/PageComponentCreateProvider'

import pageComponentsColumn from './PageComponentsListColumn'
import PageComponentCreateForm from '../PageComponentCreate/PageContentCreateForm'

const ProcessPageComponentCreate = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Create Page Component',
  }

  return (
    <CustomModal {...value}>
      <PageComponentCreateProvider>
        <PageComponentCreateForm />
      </PageComponentCreateProvider>
    </CustomModal>
  )
}

const PageComponentsListTable = () => {
  const pageComponents = usePageComponentsListQueryData()
  const isLoading = usePageComponentsListQueryLoading()
  const tableData = useMemo(() => pageComponents, [pageComponents])
  const tableColumns = useMemo(() => pageComponentsColumn, [])
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
              toolbarButtonName: 'Add Page Component',
              handleToolbarButtonClick: toggleModal,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
        {isModalOpen && (
          <ProcessPageComponentCreate isModalOpen={isModalOpen} toggleModal={toggleModal} />
        )}
      </CustomCardWithoutHeader>
    </>
  )
}

export default PageComponentsListTable

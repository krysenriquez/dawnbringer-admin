import {useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {
  useSectionComponentsListQueryData,
  useSectionComponentsListQueryLoading,
} from '@/features/website/stores/SectionComponents/SectionComponentsListQueryProvider'
import sectionComponentsColumn from './SectionComponentsListColumn'
import SectionComponentCreateForm from '../SectionComponentCreate/SectionComponentCreateForm'

const ProcessSectionComponentCreate = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Create Section Component',
  }

  return (
    <CustomModal {...value}>
      <SectionComponentCreateForm />
    </CustomModal>
  )
}

const SectionComponentsListTable = () => {
  const navigate = useNavigate()
  const sectionComponents = useSectionComponentsListQueryData()
  const isLoading = useSectionComponentsListQueryLoading()
  const tableData = useMemo(() => sectionComponents, [sectionComponents])
  const tableColumns = useMemo(() => sectionComponentsColumn, [])
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
              toolbarButtonName: 'Add Section Component',
              handleToolbarButtonClick: toggleModal,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
        {isModalOpen && (
          <ProcessSectionComponentCreate isModalOpen={isModalOpen} toggleModal={toggleModal} />
        )}
      </CustomCardWithoutHeader>
    </>
  )
}

export default SectionComponentsListTable

import {PageComponentsListQueryProvider} from '../../stores/PageComponents/PageComponentsListQueryProvider'
import PageComponentsListTable from '../../components/PageComponents/PageComponentsList/PageComponentsListTable'

const PageComponentsList = () => {
  return (
    <PageComponentsListQueryProvider>
      <PageComponentsListTable />
    </PageComponentsListQueryProvider>
  )
}

export default PageComponentsList

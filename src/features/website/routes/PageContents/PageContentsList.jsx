import {PageContentsListQueryProvider} from '../../stores/PageContents/PageContentsListQueryProvider'
import PageContentsListTable from '../../components/PageContents/PageContentsList/PageContentsListTable'

const PageContentsList = () => {
  return (
    <PageContentsListQueryProvider>
      <PageContentsListTable />
    </PageContentsListQueryProvider>
  )
}

export default PageContentsList

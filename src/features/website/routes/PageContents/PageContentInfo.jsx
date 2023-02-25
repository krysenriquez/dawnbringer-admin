import {PageContentInfoQueryProvider} from '../../stores/PageContents/PageContentInfoQueryProvider'
import PageContentInfoPage from '../../components/PageContents/PageContentInfo/PageContentInfoPage'

const PageContentInfo = () => {
  return (
    <PageContentInfoQueryProvider>
      <PageContentInfoPage />
    </PageContentInfoQueryProvider>
  )
}

export default PageContentInfo

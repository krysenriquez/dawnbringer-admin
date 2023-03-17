import {PageContentInfoQueryProvider} from '../../stores/PageContents/PageContentInfoQueryProvider'
import PageContentInfoForm from '../../components/PageContents/PageContentInfo/PageContentInfoForm'

const PageContentInfo = () => {
  return (
    <PageContentInfoQueryProvider>
      <PageContentInfoForm />
    </PageContentInfoQueryProvider>
  )
}

export default PageContentInfo

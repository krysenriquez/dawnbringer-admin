import {PageComponentInfoQueryProvider} from '../../stores/PageComponents/PageComponentInfoQueryProvider'
import {PageComponentCreateProvider} from '../../stores/PageComponents/PageComponentCreateProvider'
import PageComponentInfoForm from '../../components/PageComponents/PageComponentInfo/PageComponentInfoForm'

const PageComponentInfo = () => {
  return (
    <PageComponentInfoQueryProvider>
      <PageComponentCreateProvider>
        <PageComponentInfoForm />
      </PageComponentCreateProvider>
    </PageComponentInfoQueryProvider>
  )
}

export default PageComponentInfo

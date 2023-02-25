import {SectionComponentInfoQueryProvider} from '../../stores/SectionComponents/SectionComponentInfoQueryProvider'
import SectionComponentInfoPage from '../../components/SectionComponents/SectionComponentInfo/SectionComponentInfoPage'

const SectionComponentInfo = () => {
  return (
    <SectionComponentInfoQueryProvider>
      <SectionComponentInfoPage />
    </SectionComponentInfoQueryProvider>
  )
}

export default SectionComponentInfo

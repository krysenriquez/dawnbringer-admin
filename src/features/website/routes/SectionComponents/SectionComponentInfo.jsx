import {SectionComponentInfoQueryProvider} from '../../stores/SectionComponents/SectionComponentInfoQueryProvider'
import {SectionComponentCreateProvider} from '../../stores/SectionComponents/SectionComponentCreateProvider'
import SectionComponentInfoForm from '../../components/SectionComponents/SectionComponentInfo/SectionComponentInfoForm'

const SectionComponentInfo = () => {
  return (
    <SectionComponentInfoQueryProvider>
      <SectionComponentCreateProvider>
        <SectionComponentInfoForm />
      </SectionComponentCreateProvider>
    </SectionComponentInfoQueryProvider>
  )
}

export default SectionComponentInfo

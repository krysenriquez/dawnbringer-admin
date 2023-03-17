import {SectionComponentCreateProvider} from '../../stores/SectionComponents/SectionComponentCreateProvider'
import SectionComponentCreateForm from '../../components/SectionComponents/SectionComponentCreate/SectionComponentCreateForm'

const SectionComponentCreate = () => {
  return (
    <SectionComponentCreateProvider>
      <SectionComponentCreateForm />
    </SectionComponentCreateProvider>
  )
}

export default SectionComponentCreate

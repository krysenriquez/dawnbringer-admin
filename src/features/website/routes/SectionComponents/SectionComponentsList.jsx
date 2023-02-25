import {SectionComponentsListQueryProvider} from '../../stores/SectionComponents/SectionComponentsListQueryProvider'
import SectionComponentsListTable from '../../components/SectionComponents/SectionComponentsList/SectionComponentsListTable'

const SectionComponentsList = () => {
  return (
    <SectionComponentsListQueryProvider>
      <SectionComponentsListTable />
    </SectionComponentsListQueryProvider>
  )
}

export default SectionComponentsList

import {useDashboard} from '@/features/dashboard/stores/DashboardProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const MembersCount = () => {
  const {membersCount} = useDashboard()

  return (
    <>
      {membersCount && (
        <CustomCard cardClassName='card card-flush h-md-100' hasHeader={false}>
          <>
            <span className='symbol  symbol-75px'>
              <span className='symbol-label bg-light-danger'>
                <i className='fa fa-user-check text-danger fs-2x' />
              </span>
            </span>
            <div className='text-white fw-bold fs-3x mb-2 mt-5 text-danger'>
              {membersCount.total}
            </div>
            <div className='fw-semibold text-white fs-3'>{membersCount.description}</div>
          </>
        </CustomCard>
      )}
    </>
  )
}

export default MembersCount

import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {useBranch} from '@/providers/BranchProvider'

function SidebarMenuBranches() {
  const {branches, defaultBranch, setDefaultBranch} = useBranch()

  const setBranch = (branch) => {
    setDefaultBranch(branch)
  }

  return (
    <div className='app-sidebar-menu-secondary menu menu-rounded menu-column mb-6'>
      <div className='menu-item mb-2'>
        <div className='menu-heading text-uppercase fs-7 fw-bold'>Branches</div>
        <div className='app-sidebar-separator separator' />
      </div>
      <div className='menu-item'>
        <>
          <button
            type='button'
            data-element='selected'
            className='btn btn-outline btn-custom btn-flex w-100'
            data-menu-trigger='click'
            data-menu-attach='parent'
            data-menu-placement='bottom-start'
            data-menu-width='230px'
          >
            <span className='d-flex flex-column align-items-start flex-grow-1'>
              <span className='fs-5 fw-bold text-dark text-uppercase' data-element='title'>
                {defaultBranch && defaultBranch.branchName}
              </span>
            </span>
            <span className='d-flex flex-column me-n4'>
              <CustomSVG
                path='/media/icons/arrows/caret-top.svg'
                className='svg-icon svg-icon-3 svg-icon-gray-700'
              />
              <CustomSVG
                path='/media/icons/arrows/caret-down.svg'
                className='svg-icon svg-icon-3 svg-icon-gray-700'
              />
            </span>
          </button>
          <div
            className='menu menu-sub menu-sub-dropdown menu-column menu-state-bg menu-rounded ps-3'
            data-menu='true'
          >
            <div className='hover-scroll-y min-h-50px my-3 pe-5 me-n1'>
              {branches &&
                branches.map((branch) => {
                  return (
                    <div className='menu-item' key={branch.branchId}>
                      <button
                        className='btn btn-active-light-dark menu-link px-3 py-3 w-100'
                        data-element='project'
                        onClick={() => setBranch(branch)}
                      >
                        <span className='d-flex flex-column align-items-start'>
                          <span
                            className='fs-5 fw-bold text-dark text-uppercase'
                            data-element='title'
                          >
                            {branch.branchName}
                          </span>
                        </span>
                      </button>
                    </div>
                  )
                })}
            </div>
          </div>
        </>
      </div>
    </div>
  )
}

export default SidebarMenuBranches

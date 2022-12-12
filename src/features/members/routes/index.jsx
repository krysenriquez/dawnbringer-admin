import {Route, Routes, Outlet} from 'react-router-dom'
import {MembersListWrapper} from '../components/MembersListWrapper'

const MembersRoutes = () => {
  return (
    <Routes>
      <Route
        path=''
        element={
          <>
            <MembersListWrapper />
          </>
        }
      />
    </Routes>
  )
}

export default MembersRoutes

import {Route, Routes, Navigate} from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Login from './Login'
import ForgotPassword from './ForgotPassword'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<Login />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
      </Route>
    </Routes>
  )
}

export default AuthRoutes

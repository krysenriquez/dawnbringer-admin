import {Route, Routes, Navigate} from 'react-router-dom'
import {AuthLayout} from '../components/layout/AuthLayout'
import {LoginForm} from '../components/LoginForm'
import {ForgotPasswordForm} from '../components/ForgotPasswordForm'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<LoginForm />} />
        <Route path='forgot-password' element={<ForgotPasswordForm />} />
      </Route>
    </Routes>
  )
}

export default AuthRoutes

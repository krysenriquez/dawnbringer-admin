import {useState} from 'react'
import {useField} from 'formik'
import clsx from 'clsx'

export default function PasswordField(props) {
  const {label, required, helperText, errorText, ...rest} = props
  const [field, meta] = useField(props)
  const {touched, error, value} = meta
  const isError = touched && error && true
  const isValid = touched && !!!error && value
  const [showPassword, setShowPassword] = useState(false)

  function renderErrorMessage() {
    if (isError) {
      return error
    }
  }

  function handeClick() {
    setShowPassword(!showPassword)
  }

  return (
    <>
      {label && <label className={clsx('form-label mb-3', {required: required})}>{label}</label>}
      <div className='position-relative mb-3'>
        <input
          type={showPassword ? 'text' : 'password'}
          className={clsx('form-control form-control-solid', {
            'is-invalid': isError,
            'is-valid': isValid,
          })}
          {...field}
          {...rest}
        />
        <span
          className='btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-6'
          onClick={handeClick}
        >
          <i
            className={clsx('bi fs-2', {
              'bi-eye-slash': !showPassword,
              'bi bi-eye': showPassword,
            })}
          ></i>
        </span>
      </div>
      {helperText && <div className='text-muted fs-7'>{helperText}</div>}
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}

import {useField} from 'formik'
import clsx from 'clsx'

export default function InputGroupField(props) {
  const {
    label,
    required,
    helperText,
    errorText,
    labelPrepend,
    labelAppend,
    groupClassName,
    className,
    ...rest
  } = props
  const [field, meta] = useField(props)
  const {touched, error, value} = meta
  const isError = touched && error && true
  const isValid = touched && !!!error && value

  function renderErrorMessage() {
    if (isError) {
      return error
    }
  }

  return (
    <>
      {label && <label className={clsx('form-label mb-3', {required: required})}>{label}</label>}
      <div className={clsx('input-group', groupClassName && groupClassName)}>
        {labelPrepend ? <span className='input-group-text'>{labelPrepend}</span> : <></>}
        <input
          type='text'
          className={clsx(
            'form-control',
            {
              'is-invalid': isError,
              'is-valid': isValid,
            },
            className && className
          )}
          {...field}
          {...rest}
        />
        {labelAppend ? <span className='input-group-text'>{labelAppend}</span> : <></>}
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

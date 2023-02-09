import {useField} from 'formik'
import clsx from 'clsx'
import ReactQuill from 'react-quill'

export default function QuillField(props) {
  const {label, required, errorText, ...rest} = props
  const [field, meta, helper] = useField(props)
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
      <ReactQuill
        theme={'snow'}
        {...rest}
        value={field.value}
        name={field.name}
        onChange={field.onChange(field.name)}
      />
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}

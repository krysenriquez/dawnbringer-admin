import {useField} from 'formik'
import clsx from 'clsx'

export default function CheckboxUnstyledField(props) {
  const {label, required, errorText, ...rest} = props
  const [field, meta] = useField(props)
  const {touched, error, value} = meta

  return (
    <>
      <div className='form-check form-check-custom form-check-solid'>
        <input
          type='checkbox'
          className='form-check-input'
          {...field}
          {...rest}
          checked={clsx({checked: value})}
        />
        <span className='form-check-label fw-bold text-gray-400'>{label}</span>
      </div>
    </>
  )
}

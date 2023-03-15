import {useField, useFormikContext} from 'formik'
import clsx from 'clsx'
import Select from 'react-select'
import {useState, useEffect} from 'react'

export default function SelectInputFieldWithGrouping(props) {
  const {setFieldValue, setFieldError} = useFormikContext()
  const {label, required, errorText, data, translate, className, ...rest} = props
  const [field, meta, helpers] = useField(props)
  const {setTouched} = helpers
  const {touched, error, value} = meta
  const isError = touched && error && true
  const isValid = touched && !!!error && value
  const [defaultSelected, setDefaultSelected] = useState('')
  const [selectedValue, setSelectedValue] = useState('')

  function renderErrorMessage() {
    if (isError) {
      return error
    }
  }

  const handleChange = (e) => {
    let selected = data
      .filter((element) => element.options.find((option) => option.value === e.value))
      .reduce((acc, item) => item.options.find((option) => option.value === e.value), {})
    setSelectedValue(selected)
    setFieldValue(field.name, e.value)
    setTouched(true)
  }

  useEffect(() => {
    if (meta.initialValue && data.length > 0) {
      let selected = data
        .filter((element) => element.options.find((option) => option.value === meta.initialValue))
        .reduce(
          (acc, item) => item.options.find((option) => option.value === meta.initialValue),
          {}
        )
      setSelectedValue(selected)
      setDefaultSelected(selected)
    }
  }, [meta.initialValue, data])

  const formatGroupLabel = (data) => (
    <div className='react-select-group-label'>
      <span>{data.label}</span>
      <span className='badge badge-primary badge-circle badge-sm'>{data.options.length}</span>
    </div>
  )

  return (
    <>
      {label && <label className={clsx('form-label mb-3', {required: required})}>{label}</label>}
      <Select
        {...field}
        onChange={(e) => handleChange(e)}
        value={selectedValue}
        options={data}
        classNames={{
          singleValue: (state) => 'react-select-value',
          input: (state) => 'react-select-value',
          control: (state) => {
            if (isError) return 'react-select form-control is-invalid'
            else if (isValid) return 'react-select form-control is-valid'
            else return 'react-select form-control'
          },
          indicatorSeparator: (state) => 'd-none',
          menu: (state) => 'react-select-options',
          option: (state) =>
            state.isFocused ? 'react-select-option focused' : 'react-select-option',
        }}
        formatGroupLabel={formatGroupLabel}
      />
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}

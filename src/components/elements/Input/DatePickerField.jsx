import React, {useState, useEffect} from 'react'
import {useField} from 'formik'
import DatePicker from 'react-datepicker'
import clsx from 'clsx'

export default function DatePickerField(props) {
  const {label, required, errorText} = props
  const [field, meta, helper] = useField(props)
  const {touched, error} = meta
  const {setValue} = helper
  const isError = touched && error && true
  const {value} = field

  function renderErrorMessage() {
    if (isError) {
      return error
    }
  }

  return (
    <>
      {label && <label className={clsx('form-label mb-3', {required: required})}>{label}</label>}
      <DatePicker
        {...field}
        {...props}
        selected={value}
        dateFormat='yyyy-MM-dd'
        onChange={(date) => setValue(date)}
        className='form-control form-control-solid'
        showMonthDropdown
        showYearDropdown
        dropdownMode='select'
      />
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}

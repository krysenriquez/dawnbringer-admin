import clsx from 'clsx'
import {useField, useFormikContext} from 'formik'
import Tags from '@yaireo/tagify/dist/react.tagify'
import {useEffect, useRef} from 'react'

export default function TagField(props) {
  const {setFieldValue} = useFormikContext()
  const {placecholder, label, required, suggestions = [], className} = props
  const [field, meta] = useField(props)
  const tagifyRef = useRef()

  const baseTagifySettings = {
    blacklist: [],
    maxTags: 6,
    placeholder: placecholder,
    dropdown: {
      enabled: 0,
    },
    callbacks: {},
  }

  const handleChange = (e) => {
    const tags = e.detail.tagify.value.map((item) => item.value)
    setFieldValue(field.name, tags)
  }

  useEffect(() => {
    if (field.value) {
      if (field.value.length < 1) {
        // @ts-ignore
        tagifyRef.current && tagifyRef.current.removeAllTags()
      }
    }
  }, [field.value])

  const settings = {
    ...baseTagifySettings,
    whitelist: suggestions,
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      edit: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
      'edit:updated': handleChange,
      'edit:start': handleChange,
    },
  }

  return (
    <>
      {label && <label className={clsx('form-label mb-3', {required: required})}>{label}</label>}
      <Tags
        defaultValue={meta.initialValue}
        tagifyRef={tagifyRef}
        settings={settings}
        className={clsx('form-control', className && className)}
      />
    </>
  )
}

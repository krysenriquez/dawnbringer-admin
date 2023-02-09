import {useField, useFormikContext} from 'formik'
import {useState} from 'react'
import {useDropzone} from 'react-dropzone'

export default function ImageDropzoneField(props) {
  const {setFieldValue} = useFormikContext()
  const {name} = props
  const [field, meta] = useField(props)

  const [files, setFiles] = useState([])
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
      setFieldValue(name, acceptedFiles)
    },
  })

  const removeFile = (e, file) => {
    e.stopPropagation()
    const newFiles = [...files]
    newFiles.splice(newFiles.indexOf(file), 1)
    setFiles(newFiles)
  }

  const thumbs = files.map((file) => (
    <div className='dz-preview dz-image-preview dz-complete' key={file.name}>
      <div className='dz-image'>
        <img
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
      <span className='dz-remove' onClick={(e) => removeFile(e, file)} data-dz-remove=''>
        Remove file
      </span>
    </div>
  ))

  return (
    <div className='dropzone dz-clickable' {...getRootProps({className: 'dropzone dz-clickable'})}>
      <input {...getInputProps()} />
      {files.length == 0 && (
        <div className='dz-message'>
          <i className='bi bi-file-earmark-arrow-up text-primary fs-3x' />
          <div className='ms-4'>
            <h3 className='fs-5 fw-bold text-gray-900 mb-1'>Drop files here or click to upload.</h3>
            <span className='fs-7 fw-semibold text-gray-400'>Upload up to 10 files</span>
          </div>
        </div>
      )}
      {thumbs}
    </div>
  )
}

import {useEffect} from 'react'
import {useState} from 'react'
import Dropzone from 'react-dropzone'
import {useDropzone} from 'react-dropzone'
import {CustomSVG} from '@/components/elements/SVG/CustomSVG'

const Media = ({variant}) => {
  const [data, setData] = useState(variant)
  const [files, setFiles] = useState([])
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles)
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })

  // const thumbs = files.map((file) => (
  //   <div className='dz-preview dz-processing dz-error dz-complete dz-image-preview' key={file.name}>
  //     <div className='dz-image'>
  //       <img
  //         data-dz-thumbnail=''
  //         src={file.preview}
  //         alt={file.name}
  //         onLoad={() => {
  //           URL.revokeObjectURL(file.preview)
  //         }}
  //       />
  //     </div>
  //     <div className='dz-details'>
  //       <div className='dz-size'>
  //         <span data-dz-size=''>
  //           <strong>2.4</strong>
  //           MB
  //         </span>
  //       </div>
  //       <div className='dz-filename'>
  //         <span data-dz-name=''>{file.name}</span>
  //       </div>
  //     </div>
  //     <div className='dz-progress'>
  //       <span className='dz-upload' data-dz-uploadprogress=''></span>
  //     </div>
  //     <div className='dz-error-message'>
  //       <span data-dz-errormessage=''>Server responded with 0 code.</span>
  //     </div>
  //     <div className='dz-success-mark'>
  //       <CustomSVG
  //         path='/public/media/icons/actions/success.svg'
  //         className='svg-icon-1 position-absolute ms-6'
  //       />
  //     </div>
  //     <div className='dz-error-mark'>
  //       <CustomSVG
  //         path='/public/media/icons/actions/error.svg'
  //         className='svg-icon-1 position-absolute ms-6'
  //       />
  //     </div>
  //     <a className='dz-remove' href='javascript:undefined;' data-dz-remove=''>
  //       Remove file
  //     </a>
  //   </div>
  // ))

  const thumbs = files.map((file) => (
    <div className='dz-preview' key={file.name}>
      <div className='dz-image'>
        <img
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview)
          }}
        />
      </div>
      {/* <div class='dz-success-mark'>
        <svg
          width='54px'
          height='54px'
          viewBox='0 0 54 54'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Check</title>
          <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
            <path
              d='M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z'
              stroke-opacity='0.198794158'
              stroke='#747474'
              fill-opacity='0.816519475'
              fill='#FFFFFF'
            ></path>
          </g>
        </svg>
      </div> */}
    </div>
  ))

  useEffect(() => {
    setData(variant)
  }, [variant])

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <div className='card card-flush py-4'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>Media</h2>
        </div>
      </div>
      <div className='card-body pt-0'>
        <div className='fv-row mb-2'>
          <div id='kt_ecommerce_add_product_media' {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            {files.length == 0 && (
              <div className='dz-message'>
                <i className='bi bi-file-earmark-arrow-up text-primary fs-3x'></i>
                <div className='ms-4'>
                  <h3 className='fs-5 fw-bold text-gray-900 mb-1'>
                    Drop files here or click to upload.
                  </h3>
                  <span className='fs-7 fw-semibold text-gray-400'>Upload up to 10 files</span>
                </div>
              </div>
            )}
            <div className='dz-container'>{thumbs}</div>
          </div>
        </div>
        <div className='text-muted fs-7'>Set the product media gallery.</div>
      </div>
    </div>
  )
}
export {Media}

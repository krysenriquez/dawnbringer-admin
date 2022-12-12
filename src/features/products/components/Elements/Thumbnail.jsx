import clsx from 'clsx'
import {useState} from 'react'

const Thumbnail = ({image}) => {
  const [thumbnail, setThumbnail] = useState({})

  return (
    <div className='card card-flush py-4'>
      <div className='card-header'>
        <div className='card-title'>
          <h2>Thumbnail</h2>
        </div>
      </div>
      <div className='card-body text-center pt-0'>
        <div
          className='image-input image-input-empty image-input-outline image-input-placeholder mb-3'
          data-kt-image-input='true'
        >
          <div
            className='image-input-wrapper w-150px h-150px'
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
          <label
            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='change'
            data-bs-toggle='tooltip'
            aria-label='Change avatar'
            data-bs-original-title='Change avatar'
            data-kt-initialized='1'
          >
            <i className='bi bi-pencil-fill fs-7'></i>
            <input
              type='file'
              name='avatar'
              accept='.png, .jpg, .jpeg'
              onChange={(e) => setThumbnail(e.target.files)}
            />
            <input type='hidden' name='avatar_remove' />
          </label>
          <span
            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='cancel'
            data-bs-toggle='tooltip'
            aria-label='Cancel avatar'
            data-bs-original-title='Cancel avatar'
            data-kt-initialized='1'
          >
            <i className='bi bi-x fs-2'></i>
          </span>
          <span
            className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
            data-kt-image-input-action='remove'
            data-bs-toggle='tooltip'
            aria-label='Remove avatar'
            data-bs-original-title='Remove avatar'
            data-kt-initialized='1'
          >
            <i className='bi bi-x fs-2'></i>
          </span>
        </div>
        <div className='text-muted fs-7'>
          Set the product thumbnail image. Only *.png, *.jpg and *.jpeg image files are accepted
        </div>
      </div>
    </div>
  )
}

export {Thumbnail}

import {useEffect, useRef} from 'react'
import clsx from 'clsx'

const Modal = ({isOpen, toggleModal, closeOnOutsideClick, children}) => {
  // const modalRef = useRef(null)

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(event.target)) {
  //       toggleModal()
  //     }
  //   }
  //   document.addEventListener('mousedown', handleClickOutside)
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside)
  //   }
  // }, [modalRef, closeOnOutsideClick, toggleModal])

  useEffect(() => {
    document.body.classList.add('modal-open')
    return () => {
      document.body.classList.remove('modal-open')
    }
  }, [])

  return (
    <>
      <div className='modal fade' id='custom_modal' role='dialog' tabIndex={-1} aria-modal='true'>
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          <div className='modal-content'>{children}</div>
        </div>
      </div>
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export default Modal

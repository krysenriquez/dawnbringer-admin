import {createContext, useContext, useState} from 'react'

const CustomBlockUi = (props) => {
  const {toggleBlocking, dialogClassName, message, children} = props
  const [loading, setLoading] = useState(false)

  return (
    <div className='blockui'>
      {children}
      <div className='blockui-overlay'>
        <div className='blockui-message'>
          <span className='spinner-border text-primary'></span>
          {message}
        </div>
      </div>
    </div>
  )
}

export default CustomBlockUi

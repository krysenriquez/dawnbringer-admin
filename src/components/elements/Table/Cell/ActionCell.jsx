import CustomSVG from '@/components/elements/SVG/CustomSVG'
import clsx from 'clsx'

const ActionCell = (props) => {
  const {id, route, handleClick, children, className} = props

  return (
    <>
      <button type='button' className={clsx(className && className)} onClick={() => handleClick()}>
        {children}
      </button>
    </>
  )
}

export default ActionCell

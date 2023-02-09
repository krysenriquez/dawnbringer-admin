import clsx from 'clsx'

const CustomFormCard = (props) => {
  const {cardClassName, hasHeader = false, headerClassName, header, bodyClassName, children} = props

  return (
    <div className={clsx('card', cardClassName && cardClassName)}>
      {hasHeader && (
        <div className={clsx('card-header', headerClassName && headerClassName)}>
          <div className='card-title'>{header}</div>
        </div>
      )}
      <div className={clsx('card-body', bodyClassName && bodyClassName)}>{children}</div>
    </div>
  )
}

export default CustomFormCard

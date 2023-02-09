import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

export default function CustomTabs(props) {
  const {children, ...rest} = props
  return <Tabs {...rest}>{children}</Tabs>
}

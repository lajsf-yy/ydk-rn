import { ViewStyle } from 'react-native'

interface OverlayStyle {
  container: ViewStyle
  mask: ViewStyle
}
const style: OverlayStyle = {
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
}
export default style

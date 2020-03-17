import glyphMap from 'assets/fonts/icons'
import { createIconSet } from 'react-native-vector-icons'
import { TextStyle, StyleProp } from 'react-native'
interface IconProps {
  name: string
  style?: StyleProp<TextStyle>
  onPress?: Function
  size?: number
  color?: string
}
let Icon: React.FC<IconProps> = createIconSet(glyphMap, 'iconfont', 'iconfont.ttf')

export default Icon

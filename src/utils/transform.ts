import { Dimensions } from 'react-native'

const DESIGN_WIDTH = 750
export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height

// 转换字体大小
export function transformSize(designSize: number) {
  const number = (designSize / DESIGN_WIDTH) * SCREEN_WIDTH
  let remainder = number % 1
  const int = number - remainder
  remainder = 0.25 <= remainder && remainder < 0.75 ? 0.5 : Math.round(remainder)
  return int + remainder
}
import { Platform, ViewStyle, ImageStyle, TextStyle } from 'react-native'

export interface ToastStyle {
  container: ViewStyle
  innerContainer: ViewStyle
  innerWrap: ViewStyle
  iconToast: ViewStyle
  textToast: ViewStyle
  content: TextStyle
  image: ImageStyle
  centering: ViewStyle
}

export default {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  innerContainer: {
    backgroundColor: 'transparent',
  },
  innerWrap: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.8)',
    minWidth: 100,
  },
  iconToast: {
    borderRadius: 7,
    padding: 15,
  },
  textToast: {
    borderRadius: 3,
    paddingVertical: 9,
    paddingHorizontal: 15,
  },
  content: {
    color: 'white',
    fontSize: 15,
    lineHeight: 22,
  },
  image: {
    width: 36,
    height: 36,
    marginBottom: 10,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 9,
  },
}

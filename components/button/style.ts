import {transformSize} from '../../utils/transform';
import {GlobalColor} from 'styles';
import {ViewStyle, TextStyle} from 'react-native';

export const containerStyle: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: transformSize(50),
  backgroundColor: GlobalColor.primary,
};

export const textStyle: TextStyle = {
  fontSize: transformSize(40),
  fontWeight: '500',
  lineHeight: transformSize(56),
  color: 'white',
};

export const ghostTextStyle = {
  color: '#41D282',
};

export const defaultColor = {
  color: 'white',
};

export const indictorStyle: TextStyle = {
  marginRight: transformSize(8),
};

export const disabledStyle: ViewStyle = {
  backgroundColor: GlobalColor.disabled,
  borderColor: GlobalColor.disabled,
};

export const sizeStyle = {
  small: {
    width: transformSize(386),
    height: transformSize(100),
  },
  large: {
    width: transformSize(686),
    height: transformSize(100),
  },
};

export const typeStyle = {
  primary: {},
  ghost: {
    borderWidth: transformSize(2),
    borderColor: '#41D282',
    backgroundColor: 'white',
  },
  warning: {
    backgroundColor: GlobalColor.warning,
  },
};

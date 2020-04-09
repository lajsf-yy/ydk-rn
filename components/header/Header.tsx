/**
 * 头部的导航栏, 左边默认为返回箭头， 也可以自定义title和左右两边的内容视图
 */
import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  ViewStyle,
  TextStyle,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';
import assets from 'assets';
import {transformSize} from '../../utils/transform';

Platform.OS === 'android' && StatusBar.setTranslucent(true);
interface Props {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  translucent?: boolean;
  hideBottomBorder?: boolean;
  style?: ViewStyle;
  rightStyle?: ViewStyle;
  leftStyle?: TextStyle;
  leftWrapperStyle?: ViewStyle;
  titleStyle?: TextStyle;
  handleBackPress?: () => void;
}

export const HeaderHeight = () => 0 + transformSize(88);
export default class Header extends React.Component<Props> {
  static defaultProps = {
    translucent: false,
  };

  state = {
    statusBarHeight: StatusBar.currentHeight || 24,
  };

  static TitleStyle = {
    fontSize: transformSize(40),
    color: '#000',
    fontWeight: 'bold',
  };
  renderCenter = () => {
    let {center, title} = this.props;
    if (center) return center;
    if (title) {
      return (
        <Animated.Text
          numberOfLines={1}
          style={[s.title, this.props.titleStyle]}>
          {title}
        </Animated.Text>
      );
    }
    return null;
  };

  renderLeft = () => {
    if (typeof this.props.left !== 'undefined') {
      return this.props.left;
    } else {
      const AnimatedImage = Animated.createAnimatedComponent(Image);
      return (
        <TouchableOpacity
          onPress={() => {
            if (this.props.handleBackPress) {
              this.props.handleBackPress();
            }
          }}>
          <AnimatedImage
            resizeMode="cover"
            source={
              this.props.translucent
                ? assets.empty.arrow_left_white
                : assets.empty.arrow_left_black
            }
            style={[s.backImage, this.props.leftStyle]}
          />
        </TouchableOpacity>
      );
    }
  };

  render() {
    let style = this.props.translucent ? {} : {backgroundColor: '#fff'};
    let {statusBarHeight} = this.state;
    let top = statusBarHeight;
    let contanerHeigt = transformSize(88) + top;
    return (
      <React.Fragment>
        <Animated.View
          style={[
            s.contaner,
            {height: contanerHeigt, paddingTop: statusBarHeight},
            s.absolute,
            (this.props.translucent || this.props.hideBottomBorder) &&
              s.noBorder,
            style,
            this.props.style,
          ]}>
          <View style={[s.left, {top}, this.props.leftWrapperStyle]}>
            {this.renderLeft()}
          </View>
          <View style={s.center}>{this.renderCenter()}</View>
          <Animated.View style={[s.right, {top}, this.props.rightStyle]}>
            {this.props.right}
          </Animated.View>
        </Animated.View>
        <View
          style={{
            height: this.props.translucent ? 0 : contanerHeigt,
          }}
        />
      </React.Fragment>
    );
  }
}

const s = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
  contaner: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e5e5',
    paddingHorizontal: transformSize(110),
  },
  left: {
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: transformSize(88),
    minWidth: transformSize(110),
    paddingLeft: transformSize(30),
  },
  noBorder: {borderBottomWidth: 0},
  center: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    position: 'absolute',
    top: 0,
    right: transformSize(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: transformSize(88),
  },
  backImage: {
    paddingRight: transformSize(30),
    width: transformSize(35),
    height: transformSize(35),
  },
  title: {
    fontSize: transformSize(40),
    color: '#000',
    fontWeight: 'bold',
  },
});

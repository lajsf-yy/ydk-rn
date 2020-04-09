import React from 'react';
import {
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableOpacityProperties,
} from 'react-native';

const defaultProps = {hitSlop: {top: 10, bottom: 10, left: 10, right: 10}};

export default class Touchable extends React.Component<
  TouchableOpacityProperties
> {
  static defaultProps = defaultProps;
  static Highlight = TouchableHighlight;
  static Opacity = TouchableOpacity;
  // static NativeFeedback = TouchableNativeFeedback
  static WithoutFeedback = TouchableWithoutFeedback;

  /**
   * 防止重复点击
   */
  private passTime = 0;
  onTouchPress = (e?: any) => {
    const onPress = this.props.onPress;
    if (!onPress) {
      return;
    }
    const nowTime = new Date().getTime();
    if (nowTime - this.passTime < 800) {
      return;
    }
    this.passTime = nowTime;
    onPress(e);
  };

  render() {
    return <TouchableOpacity {...this.props} onPress={this.onTouchPress} />;
  }
}

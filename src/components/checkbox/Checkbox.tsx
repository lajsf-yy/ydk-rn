/**
 * 多选项的复选框， 比如有香蕉，葡萄，车厘子，荔枝等等可以进行多选
 */
import React from "react";
import {
  ActivityIndicator,
  Text,
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextStyle
} from "react-native";

import Icon from "./../icon";
import { GlobalColor as baseColor } from "styles";
import { transformSize } from 'utils/transform';
import Touchable from 'components/touchable';
const primary = baseColor.primary;

interface IProps {
  selected: boolean;
  size?: number;
  style?: any;
  onPress?: () => void
}

const font_color = {
  main_title: "#000000",
  assist_1: "#333333",
  assist_2: "#666666",
  assist_content: "#999999",
  assist_3: "#AAAAAA",
  assist_icon: "#bebebe",
  assist_4: "#B3B3B3",
  assist_like: "#FE5551",
  assist_5: "#ffeda2",
  assist_6: "#ff9800",
  assist_7: "#fff2be"
};

export default class extends React.PureComponent<IProps> {
  render() {
    let selected = this.props.selected;
    return (
      <Touchable onPress={() => this.props.onPress && this.props.onPress()}>
        {selected ? (
          <Icon
            name="singleselection"
            style={[styles.origin, this.props.style]}
            size={this.props.size || transformSize(26)}
            color={primary}
          />
        ) : (
          <Icon
            name="singleselection-no"
            style={[styles.origin, this.props.style]}
            size={this.props.size || transformSize(26)}
            color={font_color.assist_content}
          />
        )}
      </Touchable>
    );
  }
}

// 之所以封装一次，安卓设备对于文字会有padding空隙,做个兼容处理
const styles = StyleSheet.create<any>({
  origin: {
    alignItems: "center",
    justifyContent: "center",
    padding: transformSize(4),
    includeFontPadding: false
  }
});

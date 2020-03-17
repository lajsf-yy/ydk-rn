import React from 'react'

import {
  View,
  Dimensions,
  LayoutAnimation,
  Text,
  Image,
  StyleSheet,
  Animated,
  ActivityIndicator,
  ViewComponent,
  ViewStyle,
  TextStyle,
} from 'react-native'

interface EndTipProps {
  noMoreData?: boolean
  endTipIcon?: object
  endTipStyle?: object
}
// import noMoreIcon from '@assets/images/no-more-1.gif';
export default class EndTip extends React.Component<EndTipProps, any> {
  private endTip: ViewComponent

  render() {
    const tipText = this.props.noMoreData ? '— 已经到底了哦 —' : '内容加载中...'
    return (
      <View style={[styles.endTipContainer, this.props.endTipStyle]} ref={element => (this.endTip = element)}>
        {this.props.noMoreData ? null : <ActivityIndicator style={styles.endTipIcon} />}
        <Text style={styles.endTipText}>{tipText}</Text>
      </View>
    )
  }
}

interface StyleTypes {
  endTipContainer: ViewStyle
  endTipIcon: ViewStyle
  endTipText: TextStyle
}

let styleAttrbute: StyleTypes = {
  endTipContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  endTipIcon: {
    marginRight: 10,
  },
  endTipText: {
    textAlign: 'center',
    color: '#1F1F1F',
  }
}
const styles = StyleSheet.create(styleAttrbute)

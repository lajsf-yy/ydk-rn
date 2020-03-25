/**
 * 开关
 */
import React from 'react'
import { StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { transformSize } from 'utils/transform'
interface SwitchProps {
  onValueChange?: (value: boolean) => void
  value?: boolean
  activeColor: string
  inactiveColor: string
}
const baseWidth = 102
const baseHeight = 62
const innerWidth = 54
const borderPadWidth = 4
const BorderRadius = transformSize(baseHeight / 2)

export default class Switch extends React.Component<SwitchProps> {
  static defaultProps = {
    activeColor: '#3FCC7E',
    inactiveColor: '#E7E7E7',
  }
  constructor(props: any) {
    super(props)
  }
  state = {
    animatedValue: new Animated.Value(0)
  }

  private preValue = this.props.value
  componentWillReceiveProps(nextProps: SwitchProps) {
    if (nextProps.value !== this.preValue) {
       Animated.timing(this.state.animatedValue, {
         toValue: nextProps.value === true ? 1 : 0,
         duration: 200
       }).start()
    }
    this.preValue = nextProps.value
  }

  render() {
    let translateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, transformSize(baseWidth - borderPadWidth * 2 - innerWidth)],
      extrapolate: 'clamp',
    })
    let backColor = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.props.inactiveColor, this.props.activeColor],
    })
    return (
      <TouchableOpacity onPress={this.onPress} activeOpacity={1}>
        <Animated.View style={[styles.container, { backgroundColor: backColor }]}>
          <Animated.View style={[styles.thumbView, { transform: [{ translateX }] }]}></Animated.View>
        </Animated.View>
      </TouchableOpacity>
    )
  }
  onPress = () => {
    // let { value } = this.state
    // this.setState({
    //   value: !this.props.value,
    // })
    this.props.onValueChange && this.props.onValueChange(!this.props.value)
  }
}

const styles = StyleSheet.create({
  container: {
    width: transformSize(baseWidth),
    height: transformSize(baseHeight),
    borderRadius: BorderRadius,
    backgroundColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: transformSize(borderPadWidth),
    // borderColor: '#e6e6e6',
    // borderWidth: transformSize(2),
  },
  thumbView: {
    width: transformSize(innerWidth),
    height: transformSize(innerWidth),
    borderRadius: BorderRadius,
    // borderWidth: transformSize(1),
    // borderColor: '#e6e6e6',
    backgroundColor: '#fff',
  },
})

// tslint:disable:jsx-no-multiline-js

import React from 'react'
import { ActivityIndicator, Animated, Image, StyleSheet, Text, View } from 'react-native'
import ToastContainerStyle, { ToastStyle } from './style/index'
import { SCREEN_WIDTH, transformSize } from 'utils/transform'

export interface ToastProps {
  content: string
  duration?: number
  onClose?: () => void
  mask?: boolean
  type?: string
  onAnimationEnd?: () => void
  styles?: ToastStyle
}

const ToastContainerStyles = StyleSheet.create<any>(ToastContainerStyle)

export default class ToastContainer extends React.Component<ToastProps, any> {
  static defaultProps = {
    duration: 3,
    mask: true,
    onClose() {},
    styles: ToastContainerStyles,
  }

  anim: Animated.CompositeAnimation | null

  constructor(props: ToastProps) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(0),
    }
  }
  timer: number = null
  componentDidMount() {
    const duration = this.props.duration as number
    this.anim = Animated.timing(this.state.fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true })
    if (duration > 0) {
      this.timer = setTimeout(this.close, duration * 1000)
    }
    this.anim.start()
  }
  close = () => {
    const { onClose, onAnimationEnd } = this.props
    const duration = this.props.duration as number
    this.anim = Animated.timing(this.state.fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true })
    this.anim.start(() => {
      if (duration > 0) {
        this.anim = null
        if (onClose) {
          onClose()
        }
        if (onAnimationEnd) {
          onAnimationEnd()
        }
      }
    })
  }
  componentWillUnmount() {
    if (this.anim) {
      this.anim.stop()
      this.anim = null
    }
    this.timer && clearTimeout(this.timer)
  }

  render() {
    const { type = '', content, mask } = this.props
    const styles = this.props.styles
    const iconType: {
      [key: string]: any
    } = {
      success: require('./images/success.png'),
      fail: require('./images/fail.png'),
      offline: require('./images/offline.png'),
    }

    let iconDom: React.ReactElement<any> | null = null
    if (type === 'loading') {
      iconDom = <ActivityIndicator animating style={[styles.centering]} color="white" size="large" />
    } else if (type === 'info') {
      iconDom = null
    } else {
      iconDom = <Image source={iconType[type]} style={styles.image} />
    }

    return (
      <View style={[styles.container]} pointerEvents={mask ? undefined : 'box-none'}>
        <View style={[styles.innerContainer, { maxWidth: SCREEN_WIDTH - transformSize(100) }]}>
          <Animated.View style={{ opacity: this.state.fadeAnim }}>
            <View style={[styles.innerWrap, iconDom ? styles.iconToast : styles.textToast]}>
              {iconDom}
              <Text style={styles.content}>{content}</Text>
            </View>
          </Animated.View>
        </View>
      </View>
    )
  }
}

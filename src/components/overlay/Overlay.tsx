import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { View, Dimensions, TouchableWithoutFeedback, Animated, ViewStyle, Easing } from 'react-native'
import style from './style'
import useBackHander from 'uses/useBackHander'
import { TopViewProps, TopViewComponent } from './../topview/TopView'

const screen = Dimensions.get('window')
export interface OverlayProps extends TopViewProps {
  onBackPress?: () => boolean
  animationDuration?: number
  popupType: 'none' | 'fade' | 'slide-up' | 'slide-down' | 'slide-left'
  maskClosable?: boolean
  containerStyle?: ViewStyle
  maskStyle?: ViewStyle
  ChildComponent: TopViewComponent
}
const Overlay: React.FC<OverlayProps> = ({
  animationDuration = 200,
  popupType = 'none',
  maskClosable = false,
  ChildComponent,
  onBackPress,
  ...props
}) => {
  const [visible, setVisible] = useState(true)
  useBackHander(() => {
    if (onBackPress) return onBackPress()
    onDismiss()
    return true
  })
  const getPosition = useCallback(
    (visible: boolean) => {
      if (visible) {
        return 0
      }
      return popupType === 'slide-down' ? -screen.height : screen.height
    },
    [popupType],
  )
  const [data, setData] = useState(false as any)
  const opacity = useRef(new Animated.Value(0))
  const position = useRef(new Animated.Value(getPosition(!visible)))

  const popupStyle = useMemo(() => {
    switch (popupType) {
      case 'slide-up':
        return {
          transform: [{ translateY: position.current }],
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }
      case 'slide-down':
        return {
          transform: [{ translateY: position.current }],
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
        }
      case 'fade':
        return {
          opacity: opacity.current,
        }
      case 'slide-left':
        return {
          transform: [{ translateX: position.current }],
          position: 'absolute',
          bottom: 0,
          right: 0,
          top: 0,
        }
      default:
        return {}
    }
  }, [popupType])

  const onDismiss = (data?: any) => {
    setVisible(false)
    setData(data)
  }
  useEffect(() => {
    let animationOpacity = Animated.timing(opacity.current, {
      toValue: visible ? 1 : 0,
      duration: animationDuration - 100,
      // easing: visible ? Easing.elastic(0.8) : undefined, //YYJH-5199
      useNativeDriver: true,
    })
    animationOpacity.start(() => {
      animationOpacity = null
      if (!visible) {
        props.onDismiss(data)
      }
    })
    let positionAnimation = Animated.timing(position.current, {
      toValue: getPosition(visible),
      duration: animationDuration,
      // easing: visible ? Easing.elastic(0.8) : undefined, //YYJH-5199
      useNativeDriver: true,
    })
    positionAnimation.start(() => (positionAnimation = null))
    return () => {
      animationOpacity && animationOpacity.stop()
      positionAnimation && positionAnimation.stop()
    }
  }, [visible, animationDuration, getPosition, props, data])

  const onMaskClose = () => {
    if (maskClosable) {
      setVisible(false)
    }
  }

  return (
    <View style={[style.container]}>
      <TouchableWithoutFeedback onPress={onMaskClose}>
        <Animated.View style={[style.mask, { opacity: opacity.current }, props.maskStyle]}></Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[popupStyle, style.container, props.containerStyle]} pointerEvents="box-none">
        <ChildComponent onDismiss={onDismiss} />
        {/* <View style={{ height: 200, backgroundColor: 'white' }} /> */}
      </Animated.View>
    </View>
  )
}

export default Overlay

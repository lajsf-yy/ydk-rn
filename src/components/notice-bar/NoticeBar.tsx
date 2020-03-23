import React, { useEffect, useState, useRef, useCallback } from 'react'
import { View, Text, StyleSheet, Image, StyleProp, TextStyle, ViewStyle, TextInput, TextInputProperties, StatusBar, Animated, UIManager, findNodeHandle, Easing, LayoutChangeEvent } from 'react-native'
import assets from 'assets'
import Touchable from './../touchable'
import { transformSize } from 'utils/transform'
import Icon from 'components/icon'
import { containerStyles } from 'styles'

interface NoticeBarProps extends TextInputProperties {
    height?: number
}

const NoticeBar:React.FC<NoticeBarProps> = (props) => {
    const [cw, setCW] = useState(0)
    const containerRef = useRef(null);
    const animatedRef = useRef(new Animated.Value(0));
    const animatedEctypeRef = useRef(new Animated.Value(0)); 
    const animationRef = useRef<Animated.CompositeAnimation>(null);
    const translateX = animatedRef.current.interpolate({
        inputRange: [0, 1],
        outputRange: [-cw, cw],
        extrapolate: "clamp"
    })
    const translateXEctype = animatedEctypeRef.current.interpolate({
        inputRange: [0, 0.33, 1],
        outputRange: [-2 * cw, -cw, cw],
        extrapolate: "clamp"
    })

    const startAnimation = useCallback(() => {
        if (animationRef.current) {
            animationRef.current.stop();
            animatedRef.current.setValue(0)
            animatedEctypeRef.current.setValue(0)
        }
        const animation = Animated.timing(animatedRef.current, {
            toValue: 1,
            duration: cw * 20,
            easing: Easing.linear,
            useNativeDriver: true
        })
        const animationEctype = Animated.timing(animatedEctypeRef.current, {
            toValue: 1,
            duration: cw * 40,
            easing: Easing.linear,
            useNativeDriver: true
        })
        animationRef.current =  Animated.loop(Animated.parallel([animation, animationEctype]))
        animationRef.current.start()
    }, [cw])

    useEffect(() => {
        startAnimation()
        return () => {
            animationRef.current && animationRef.current.stop()
        }
    }, [startAnimation])

    return (
        <React.Fragment>
            <Animated.View  
                ref={containerRef}
                style={[s.container]}
                collapsable={false}>
                <Animated.Text 
                    onLayout={(e: LayoutChangeEvent) => {
                        if (!cw) {  
                            console.warn(e.nativeEvent.layout.width)
                            setCW(e.nativeEvent.layout.width)
                        }
                    }}
                    style={{
                        transform: [{translateX}]
                    }}
                  >{props.children}</Animated.Text>
                  <Animated.View 
                    style={{position: "absolute", zIndex: 1, flexWrap: "wrap",  transform: [{translateX: translateXEctype}]}}>
                    <Animated.Text 
                    >{props.children}</Animated.Text>
                  </Animated.View>
            </Animated.View >
        </React.Fragment>
    )
}

NoticeBar.defaultProps = {
    height: transformSize(35)
}

export default NoticeBar

const s = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        width: '100%',
        // overflow: "hidden"
    }
})

import React from 'react'
import {
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProperties,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native'
import {containerStyle, 
    textStyle,
     indictorStyle,
      disabledStyle,
      defaultColor,
       sizeStyle,
        typeStyle, 
        ghostTextStyle
     } from './style'

interface ButtonProps extends TouchableOpacityProps {
    type?: 'primary' | 'warning' | 'ghost'
    size?: 'large' | 'small'
    loading?: boolean
    style?: ViewStyle
    title?: string
    onPress?: (_?: any) => void
    textStyle?: StyleProp<TextStyle>
}

export default class Button extends React.Component<ButtonProps, any > {

    static defaultProps = {
        type: "primary",
        size: "large",
        loading: false,
        title: ""
    }

    private timer = 0;
    private onPress = () => {
        if (!this.props.onPress) {
            return
        }
        const noTimer = new Date().getTime()
        if (noTimer - this.timer < 800) {
            return
        }
        this.props.onPress()
    }   


    private renderInner = () => {
        const {title, children, type, disabled} = this.props
        if (this.props.loading) {
            return (
                <ActivityIndicator style={[indictorStyle]} animating size="small" color="#fff" />
            )
        }
        const textStyles = [
            textStyle,
            type === "ghost" ? ghostTextStyle : null,
            disabled ? defaultColor : null,
            this.props.textStyle
        ]
        return (
            <Text style={textStyles}>{title ? title : children}</Text>
        )
    }

    render() {
        const {
            onPress,
            style,
            type,
            loading,
            size,
            title,
            disabled,
            children,
            ...restProps
        } = this.props
        const containerStyles = [
            containerStyle,
            style,
            sizeStyle[size],
            typeStyle[type],
            disabled ? disabledStyle : null,
        ]
        return (
            <TouchableOpacity 
                style={containerStyles}
                disabled={disabled}
                onPress={this.onPress} 
                {...restProps}>
                {this.renderInner()}
            </TouchableOpacity >
        )
    }
}
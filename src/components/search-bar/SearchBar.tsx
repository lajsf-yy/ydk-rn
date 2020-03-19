import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Image, StyleProp, TextStyle, ViewStyle, TextInput, TextInputProperties, StatusBar } from 'react-native'
import assets from 'assets'
import Touchable from './../touchable'
import { transformSize } from 'utils/transform'
import Icon from 'components/icon'
import { containerStyles } from 'styles'

interface SearchBarProps extends TextInputProperties {
    rightView?: React.ReactNode
    rightText?: string
    style?: ViewStyle
    searchBoxStyle?: ViewStyle
    textInputStyle?: ViewStyle
    disabled?: boolean,
    fixed?: boolean,
    onClose?: () => void
    onRightPress?:() => void
}

const SearchBar:React.FC<SearchBarProps> = (props) => {
    const {rightView, rightText, disabled, fixed, ...otherProps} = props;
    const TextInputRef = useRef<TextInput>()
    const timerRef = useRef<number>(0)
    const SBHeight = StatusBar.currentHeight || 24
    const fixedStyle = fixed ? {...s.fixed, paddingTop: SBHeight} : null
    /**
     * 防止在ios如果页面设置为自动获取焦点，导致页面闪烁的问题
     * 防止安卓直接改变状态可能导致调用弹起键盘失败的问题
     */
    useEffect(() => {
        if (!TextInputRef.current) {
            return
        }
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            if (props.autoFocus) {
                TextInputRef.current.focus()
            } else {
                TextInputRef.current.blur()
            }
        }, 300)
        return () => clearTimeout(timerRef.current)
    }, [props.autoFocus])

    const renderSearchBox = () => {
        const InputView = disabled ? View : TextInput;
        return (
            <View style={[containerStyles.container, s.searchBox, props.searchBoxStyle]}>
                <Icon name="seach" style={s.searchIcon}></Icon>
                 <InputView 
                    {...otherProps}
                    textAlignVertical="center"
                    style={[s.input, props.textInputStyle]} 
                    ref={TextInputRef}
                    ></InputView>
                    {
                        props.onClose ? <Touchable style={s.closeContainer} onPress={() => {
                            props.onClose && props.onClose()
                        }}>
                           <Icon name="close" color="#F7F7F7"></Icon>
                        </Touchable> : null
                    }
            </View>
        )
    }

    const renderRightView = () => {
    let defaultView = (<Text style={s.rightText}>{rightText ? rightText : "取消" }</Text>)
        return typeof rightView !== "undefined" ? rightView : defaultView
    }   


    return (
        <React.Fragment>
            <View style={[containerStyles.container, fixedStyle, props.style]}>
                {renderSearchBox()}
                <Touchable onPress={() =>　props.onRightPress && props.onRightPress()}>
                    {renderRightView()}
                </Touchable>
            </View>
            {fixed ? <View style={{height: transformSize(72) + SBHeight}}/> : null}
        </React.Fragment>

    )
}

SearchBar.defaultProps = {
    placeholderTextColor: "#999999"
}

export default SearchBar

const s = StyleSheet.create({
    fixed: {
       position: 'absolute',
       top: 0,
       left: 0,
       zIndex: 999,
       width: '100%'
    },
    searchBox: {
        flex: 1,
        height: transformSize(72),
        borderRadius: transformSize(36),
        backgroundColor: "#F1F1F1"
    },
    searchIcon: {
        fontSize: transformSize(34),
        color:　"#cccccc"
    },
    input: {
        flex: 1
    },
    closeContainer: {
        width: transformSize(36),
        height: transformSize(36),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: transformSize(18),
        backgroundColor: "#CDCDCD"
    },
    rightText: {
        marginLeft: transformSize(22),
        fontSize: transformSize(34),
        fontWeight: "500",
        color: "#333",
        lineHeight: transformSize(45)
    }
})

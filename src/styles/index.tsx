import { transform } from '@babel/core'
import { transformSize } from 'utils/transform'
import { ViewStyle } from 'react-native'


interface ContainerStyleAttribute {
    container: ViewStyle
}


/**
 * 基础色调
 */
export const GlobalColor = {
    primary: '#41D282',
    disabled: "#CCC",
    success: '#6abf47', // 成功
    warning: '#f4333c', // 警告
    error: '#fe262b', // 错误
    important: '#ff5b05', // 重要信息,eg:小红点提示
    wait: '#108ee9',
} 


export const containerStyles: ContainerStyleAttribute = {
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: transformSize(32)
    }
}
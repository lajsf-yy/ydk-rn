import React, { useState } from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import { useActionSheet } from 'uses/useActionSheet';
import Button from 'components/button';

/**
 * 一般场景
 */
const ActionSheetTest = () => {
    const actionSheet = useActionSheet()
    const popupSheet = () => {
        let options = ['删除', '取消']
        let colorOptions = ['#F4565E']
        actionSheet.show({ options, colorOptions, cancelButtonIndex: options.length - 1 }).then((buttonIndex) => {
            
        })
    }

    /**
     * 多个选项并且设置不同的颜色
     * 加入标题和消息内容
     */
    const popupSheet2 = () => {
        let options = ['删除','置顶', '取消']
        let colorOptions = ['#F4565E', "green"]
        actionSheet.show({
             options, 
             colorOptions, 
             title: "标题",
             message: "欢迎使用actionSheet", cancelButtonIndex: options.length - 1 })
             .then((buttonIndex) => {
                alert(buttonIndex)
            })
    }


    return (
        <View>
            <Button onPress={popupSheet} title="一般场景"></Button>
            <Button onPress={popupSheet2} title="多个颜色">多个颜色</Button>
        </View>
    )
}


export default ActionSheetTest;
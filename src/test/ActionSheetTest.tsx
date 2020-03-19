import React, { useState } from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import { useActionSheet } from 'uses/useActionSheet';
import Button from 'components/button';

const ActionSheetTest = () => {
    const actionSheet = useActionSheet()
    const popupSheet = () => {
        let options = ['删除', '取消']
        let colorOptions = ['#F4565E']
        actionSheet.show({ options, colorOptions, cancelButtonIndex: options.length - 1 }).then((buttonIndex) => {
            
        })
      
    }

    return (
        <View>
            <Button onPress={popupSheet} title="按钮">按钮</Button>
        </View>
    )
}


export default ActionSheetTest;
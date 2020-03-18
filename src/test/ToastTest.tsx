import React, { useState } from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import Switch from 'components/switch';
import Button from 'components/button';
import { useToast } from 'uses/useToast';

const ToastTest = () => {
  const toast = useToast()
  
  return (
    <View style={{flex: 1}} >
      <ScrollView>
            <Button onPress={() => {
                toast.show("hello")
            }}>提示</Button>

            <Button onPress={() => {
                toast.success("hello")
            }}>提示success</Button>
            <Button onPress={() => {
                toast.fail("hello")
            }}>fail</Button>
      </ScrollView>
    </View>
  ) 
}


export default ToastTest
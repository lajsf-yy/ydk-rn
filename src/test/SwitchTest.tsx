import React, { useState } from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import Switch from 'components/switch';

const SwitchTest = () => {
  const [charge, setCharge] = useState(false)
  
  return (
    <View style={{flex: 1}} >
      <ScrollView>
        <Switch
          trackColor={{ true: '#41D282', false: 'pink' }}
          onValueChange={(newValue: boolean) => {
            setCharge(newValue)
          }}
          value={charge}
          thumbColor={'#fff'}
          ios_backgroundColor={'#999'}></Switch>
      </ScrollView>
    </View>
  ) 
}


export default SwitchTest
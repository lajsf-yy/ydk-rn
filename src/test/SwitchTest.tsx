import React, {useState} from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import Switch from 'components/switch';
import {transformSize} from 'utils';

const SwitchTest = () => {
  const [charge, setCharge] = useState(false);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            marginTop: transformSize(30),
            marginLeft: transformSize(50),
          }}>
          <Switch
            trackColor={{true: '#41D282', false: 'pink'}}
            onValueChange={(newValue: boolean) => {
              setCharge(newValue);
            }}
            value={charge}
            thumbColor={'#fff'}
            ios_backgroundColor={'#999'}></Switch>
        </View>
      </ScrollView>
    </View>
  );
};

export default SwitchTest;

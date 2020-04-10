import React, {useState} from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import Indicator from '../../components/indicator';
import {transformSize} from '../../utils';

const IndicatorTest = () => {
  return (
    <View style={{flex: 1}}>
      <Indicator preset="request-fail" />
    </View>
  );
};

export default IndicatorTest;

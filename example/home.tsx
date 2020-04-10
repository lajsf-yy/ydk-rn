/**
 * @format
 */
import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Button
        title="Button"
        onPress={() => {
          navigation.navigate('ButtonTestScreen');
        }}
      />

      <Button
        title="ActionSheet"
        onPress={() => {
          navigation.navigate('ActionSheetTestScrren');
        }}
      />

      <Button
        title="FlowList"
        onPress={() => {
          navigation.navigate('FlowListTestScreen');
        }}
      />

      <Button
        title="Header"
        onPress={() => {
          navigation.navigate('HeaderTestScreen');
        }}
      />

      <Button
        title="Toast"
        onPress={() => {
          navigation.navigate('ToastTestScreen');
        }}
      />

      <Button
        title="Overlay"
        onPress={() => {
          navigation.navigate('OverlayTestScreen');
        }}
      />

      <Button
        title="Switch"
        onPress={() => {
          navigation.navigate('SwitchTestScreen');
        }}
      />

      <Button
        title="Indicator"
        onPress={() => {
          navigation.navigate('IndicatorTest');
        }}
      />
    </View>
  );
};

export default Home;

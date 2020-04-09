/**
 * @format
 */
import React from 'react';
import {View, Text, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor: 'pink'}}>
      <Button
        title="button"
        onPress={() => {
          navigation.navigate('ButtonTestScreen');
        }}>
        button
      </Button>
      <Button
        title="ActionSheet"
        onPress={() => {
          navigation.navigate('ActionSheetTestScrren');
        }}>
        button
      </Button>
      <Button
        title="FlowList"
        onPress={() => {
          navigation.navigate('FlowListTestScreen');
        }}>
        button
      </Button>
      <Button
        title="Header"
        onPress={() => {
          navigation.navigate('HeaderTestScreen');
        }}>
        Header
      </Button>
      <Button
        title="toast"
        onPress={() => {
          navigation.navigate('ToastTestScreen');
        }}>
        Header
      </Button>
      <Button
        title="Overlay"
        onPress={() => {
          navigation.navigate('OverlayTestScreen');
        }}>
        Header
      </Button>
      <Button
        title="Switch"
        onPress={() => {
          navigation.navigate('SwitchTestScreen');
        }}>
        Header
      </Button>
    </View>
  );
};

export default Home;

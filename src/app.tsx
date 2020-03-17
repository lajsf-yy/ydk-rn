import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import ButtonTest from './test/ButtonTest';
import FlowListTest from 'test/FlowListTest';
import CheckboxTest from 'test/CheckboxTest';

export default class App extends React.Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <View style={{flex: 1}} >
        <ScrollView>
            <ButtonTest></ButtonTest>
            {/* <FlowListTest></FlowListTest> */}
            <CheckboxTest></CheckboxTest>
        </ScrollView>
      </View>
    ) 
  }
}

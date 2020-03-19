import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import ButtonTest from './test/ButtonTest';
import FlowListTest from 'test/FlowListTest';
import CheckboxTest from 'test/CheckboxTest';
import StarScore from 'components/star-score/StarScore';
import HeaderTest from 'test/HeaderTest';
import ToastTest from 'test/ToastTest';
import OverlayTest from 'test/OverlayTest';
import ActionSheetTest from 'test/ActionSheetTest';
import SearchBar from 'components/search-bar';
import SearchBarTest from 'test/SearchBarTest';

export default class App extends React.Component {

  componentDidMount() {
    
  }

  render() {
    return (
      <View style={{flex: 1}} >
        <HeaderTest></HeaderTest>
        <SearchBarTest></SearchBarTest>
        <ScrollView>
            <ButtonTest></ButtonTest>
            {/* <FlowListTest></FlowListTest> */}
            <CheckboxTest></CheckboxTest>
            <StarScore></StarScore>
            <ToastTest></ToastTest>
            <OverlayTest></OverlayTest>
            <ActionSheetTest></ActionSheetTest>
        </ScrollView>
      </View>
    ) 
  }
}

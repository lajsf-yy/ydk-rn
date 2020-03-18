import React from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import Header from 'components/header/Header';

export default class extends React.Component {

  componentDidMount() {
   
  }

  render() {
    return (
      <View style={{flex: 1}} >
        <Header></Header>
        <ScrollView>
            
        </ScrollView>
      </View>
    ) 
  }
}

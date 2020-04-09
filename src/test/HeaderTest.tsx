import React from 'react';
import {View, AsyncStorage, ScrollView, Text} from 'react-native';
import Header from '../../components/header/Header';

export default class extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <Header
          title="这个是header"
          titleStyle={{color: 'red'}}
          right={
            <View>
              <Text>这个是右边的</Text>
            </View>
          }></Header>
      </View>
    );
  }
}

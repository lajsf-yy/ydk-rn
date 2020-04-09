import React from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import Button from 'components/button';

export default class extends React.Component {

  componentDidMount() {
   
  }

  render() {
    return (
      <View style={{flex: 1}} >
            <Button>默认</Button>
            <Button type="ghost">ghost</Button>
            <Button type="ghost" disabled>disabled</Button>
            <Button type="ghost" size="small">确定</Button>
      </View>
    ) 
  }
}

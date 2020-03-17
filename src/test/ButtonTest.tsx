import React from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import Button from 'components/button';

export default class extends React.Component {

  componentDidMount() {
   
  }

  render() {
    return (
      <View style={{flex: 1}} >
        <ScrollView>
            <Button >确定</Button>
            <Button type="ghost">确定</Button>
            <Button type="ghost" disabled>确定</Button>
            <Button type="ghost" size="small">确定</Button>
        </ScrollView>
      </View>
    ) 
  }
}

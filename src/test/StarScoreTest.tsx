import React from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import StarScore from 'components/star-score/StarScore';

export default class extends React.Component {

  componentDidMount() {
   
  }

  render() {
    return (
      <View style={{flex: 1}} >
        <ScrollView>
            <StarScore></StarScore>
        </ScrollView>
      </View>
    ) 
  }
}

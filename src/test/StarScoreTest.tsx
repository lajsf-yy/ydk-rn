import React from 'react';
import {View, AsyncStorage, ScrollView, Text} from 'react-native';
import StarScore from 'components/star-score/StarScore';

export default class extends React.Component {

  componentDidMount() {
   
  }

  /**
   * 不可点击的
   */
  renderDisabled() {
    return (
        <View>
          <Text>不可点击的</Text>
          <StarScore defaultIndex={2} defaultTotalScore={5} disabled></StarScore>
      </View>
    )
  }


  /**
   * function event事件
   */
  renderOnselectDemo() {
    return (
      <View>
          <Text>点击的selectIndex事件</Text>
          <StarScore defaultIndex={2} defaultTotalScore={5} selectIndex={(index) => {
            alert(index)
          }}></StarScore>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}} >
        <ScrollView>      
            <StarScore defaultIndex={1} defaultTotalScore={1}></StarScore>
            {this.renderDisabled()}
            {this.renderOnselectDemo()}
        </ScrollView>
      </View>
    ) 
  }
}

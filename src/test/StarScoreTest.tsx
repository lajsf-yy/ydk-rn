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
            {/* defaultTotalScore 为总的个数 */}
            <StarScore defaultIndex={1} defaultTotalScore={1}></StarScore>
             {/* defaultIndex 为当前选中的索引 */}
            <StarScore defaultIndex={2} defaultTotalScore={5} selectIndex={(index) => {
              alert(index)
            }}></StarScore>
            {/* 不可点击的 */}
            <StarScore defaultIndex={2} defaultTotalScore={5} disabled></StarScore>
        </ScrollView>
      </View>
    ) 
  }
}

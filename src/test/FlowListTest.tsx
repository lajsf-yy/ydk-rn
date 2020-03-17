import React from 'react';
import {View, AsyncStorage, ScrollView, Text} from 'react-native';
import FlowList from 'components/flowlist/List';

export default class extends React.Component {

  componentDidMount() {
     this.request({pageSize: 20, pageNo: 1} )
  }

  private URL = "https://api-mo.lajsf.com/gateway/search/v2.0/pb/nutrition-search/action/searchDiet";

  private request = (body: {}) => {
     return fetch(`${this.URL}?pageNo=${body.pageNo}&pageSize=${body.pageSize}&keyword=菜`, {
         method: "GET",
         headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            tenantId: "nutrition-plan",
            devType: "4",
        }
     }).then((res) => {
        return res.json().then((data) => {
            return data.data
        })
     }).catch((e) => {
        console.log(e, "res err")
     })
  }

  renderItem = (item: any, index: number) => {
      console.log(item, "renderItem")
      return (
          <View style={{height: 80}}>
              <Text style={{textAlign:"center", fontSize: 20}}>{item.dietName}</Text>
          </View>
      )
  }

  render() {
    return (
      <View style={{flex: 1}} >
          <FlowList 
            renderItem={this.renderItem}
            api={this.request}>
          </FlowList>
      </View>
    ) 
  }
}

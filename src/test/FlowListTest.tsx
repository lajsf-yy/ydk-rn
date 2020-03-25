import React from 'react';
import {View, AsyncStorage, ScrollView, Text, Alert, Button} from 'react-native';
import FlowList from 'components/flow-list/List';

export default class extends React.Component {

  componentDidMount() {
    
  }

  private flowRef = React.createRef<FlowList<any>>()

  /**
   * 拿取state的值
   */
  private getFlowRef = () => {
    // 通过ref 拿取flowlist 对象的实例
     const dat = this.flowRef.current.state.data;
     alert(JSON.stringify(dat))
  }

  private URL = "https://api-mo.lajsf.com/gateway/search/v2.0/pb/nutrition-search/action/searchDiet";

  //　请求的方法
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
      return (
          <View style={{height: 80}}>
              <Text style={{textAlign:"center", fontSize: 20}}>{item.dietName}</Text>
          </View>
      )
  }

  renderGetRefDemo = () => {
    return (
      <Button onPress={() => this.getFlowRef()} title="get ref"></Button>
    )
  }

  render() {
    return (
      <View style={{flex: 1}} >
          {this.renderGetRefDemo()}
          <FlowList 
            ref={this.flowRef}
            renderItem={this.renderItem}
            api={this.request}>
          </FlowList>
      </View>
    ) 
  }
}

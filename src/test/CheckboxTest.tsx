import React from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import Checkbox from 'components/checkbox';
interface CheckboxState {
   select: boolean
}

export default class CheckboxTest extends React.Component<any, CheckboxState> {

  constructor(props: any) {
    super(props)
    this.state = {
      select: true
    }
  }

  componentDidMount() {
   
  }

  render() {
    return (
      <View style={{flex: 1}} >
        <ScrollView>
            <Checkbox selected={this.state.select} onPress={() => {
              this.setState({select: true})
            }}></Checkbox>
            <Checkbox selected={this.state.select} onPress={() => {
              this.setState({select: true})
            }}></Checkbox>
        </ScrollView>
      </View>
    ) 
  }
}

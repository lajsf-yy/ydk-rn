import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Button from '../../components/button';
import {transformSize} from '../../utils';
export default class extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <View style={{flex: 1}}>
        <Button style={styles.button}>默认</Button>
        <Button type="ghost" style={styles.button}>
          ghost
        </Button>
        <Button type="ghost" disabled style={styles.button}>
          disabled
        </Button>
        <Button type="ghost" size="small" style={styles.button}>
          确定
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    marginTop: transformSize(30),
    marginLeft: transformSize(30),
  },
});

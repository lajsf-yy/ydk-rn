import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {transformSize} from 'utils';
import Button from 'components/button';
import {useToast} from 'uses/useToast';

const ToastTest = () => {
  const toast = useToast();

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Button
          style={styles.button}
          onPress={() => {
            toast.show('hello');
          }}>
          默认的toast
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            toast.success('hello');
          }}>
          提示success
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            toast.fail('hello');
          }}>
          提示fail
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            toast.info('hello');
          }}>
          提示info
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            toast.loading('hello');
          }}>
          提示loading
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: transformSize(30),
    marginLeft: transformSize(30),
  },
});

export default ToastTest;

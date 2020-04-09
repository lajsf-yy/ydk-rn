import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import Button from '../../components/button';
import {useOverlay} from '../../uses/useOverlay';
import {transformSize} from '../../utils/transform';
import Touchable from '../../components/touchable';

const OverlayTest = () => {
  const overlay = useOverlay();

  /**
   * 一般场景, 由底部向上弹出
   */
  const popupUp = () => {
    const options: any = {
      popupType: 'slide-up',
    };
    overlay.show(props => {
      return (
        <Touchable onPress={props.onDismiss}>
          <View
            style={{
              width: transformSize(686),
              height: transformSize(300),
              backgroundColor: 'white',
            }}
          />
        </Touchable>
      );
    }, options);
  };

  const popupDown = () => {
    const options: any = {};
    overlay.show(
      props => {
        return (
          <Touchable onPress={props.onDismiss}>
            <View
              style={{
                width: transformSize(686),
                height: transformSize(300),
                backgroundColor: 'white',
              }}
            />
          </Touchable>
        );
      },
      {
        /**
         * 弹出类型
         */
        popupType: 'slide-down',
        /**
         * 动画持续时间
         */
        animationDuration: 500,
        /**
         * 包裹当前容器的内部样式容器样式
         */
        containerStyle: {
          backgroundColor: 'green',
        },
      },
    );
  };

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Button style={styles.button} onPress={popupUp}>
          向上弹出
        </Button>
        <Button style={styles.button} onPress={popupDown}>
          顶部划出
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

export default OverlayTest;

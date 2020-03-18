import React, { useState } from 'react';
import {View, AsyncStorage, ScrollView} from 'react-native';
import Switch from 'components/switch';
import Button from 'components/button';
import { useToast } from 'uses/useToast';
import { useOverlay } from 'uses/useOverlay';
import { transformSize } from 'utils/transform';
import Touchable from 'components/touchable';

const OverlayTest = () => {
  const overlay = useOverlay()

  const popup = () => {
      overlay.show((props) => {
          return <Touchable onPress={props.onDismiss}><View style={{
              width: transformSize(686),
              height: transformSize(300),
              backgroundColor: "white"
          }}/></Touchable>
      }, {
          popupType: "slide-up"
      })
  }
  
  return (
    <View style={{flex: 1}} >
      <ScrollView>
            <Button onPress={popup}>show</Button>
      </ScrollView>
    </View>
  ) 
}

export default OverlayTest
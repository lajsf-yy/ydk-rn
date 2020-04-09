import React, {useEffect, useRef, useCallback} from 'react';
import {BackHandler} from 'react-native';

const useBackHander = (callBack: () => boolean) => {
  const cbRef = useRef(callBack);
  const componentAppeared = useRef(true);
  const onHardwareBackPress = useCallback(() => {
    if (componentAppeared.current) return cbRef.current();
  }, []);
  useEffect(() => {
    cbRef.current = callBack;
  });
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', onHardwareBackPress);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onHardwareBackPress);
  }, [onHardwareBackPress]);
};
export {useBackHander};

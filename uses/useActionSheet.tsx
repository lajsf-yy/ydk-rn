import React from 'react';
import {ActionSheetIOSOptions} from 'react-native';
import {useOverlay} from './useOverlay';
import ActionSheetContainer, {
  ActionSheetOptions,
} from '../components/action-sheet/ActionSheetContainer';

export const useActionSheet = () => {
  const overlay = useOverlay();
  const show = (
    options: ActionSheetIOSOptions & ActionSheetOptions,
  ): Promise<number> => {
    options = {tintColor: '#333', ...options};
    // IOS 原生的不支持修改颜色，修改为自己的
    // if (Platform.OS == 'ios')
    //   return new Promise(resolve => {
    //     ActionSheetIOS.showActionSheetWithOptions(options, resolve)
    //   })
    return overlay.show(
      overlayProps => <ActionSheetContainer {...options} {...overlayProps} />,
      {
        popupType: 'slide-up',
        maskStyle: {backgroundColor: 'rgba(0,0,0,0.4)'},
        maskClosable: typeof options.cancelButtonIndex != 'undefined',
      },
    );
  };
  return {show};
};

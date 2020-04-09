import React, {useMemo, useRef, useEffect} from 'react';
import Overlay, {OverlayProps} from '../components/overlay/Overlay';
import {TopViewComponent} from '../components/topview/TopView';
import {useTopView} from './useTopView';
export const useOverlay = () => {
  const topview = useTopView();
  const topViewRef = useRef(topview);
  useEffect(() => {
    topViewRef.current = topview;
  });
  const overlay = useMemo(() => {
    const show = (
      Component: TopViewComponent,
      overlayProps?: Omit<OverlayProps, 'ChildComponent' | 'onDismiss'>,
    ) => {
      return topViewRef.current.show(props => {
        return (
          <Overlay
            {...overlayProps}
            onDismiss={props.onDismiss}
            ChildComponent={Component}
          />
        );
      });
    };
    return {show};
  }, []);
  return overlay;
};

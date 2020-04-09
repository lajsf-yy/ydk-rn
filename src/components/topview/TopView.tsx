import React, {useState, useRef} from 'react';
import {View, InteractionManager} from 'react-native';
export type Dismiss = (data?: any) => void;
export interface TopViewProps {
  onDismiss: Dismiss;
}
export type TopViewComponent = React.ComponentType<TopViewProps>;
interface TopViewContext {
  show(TopViewComponent: TopViewComponent): Promise<any>;
}
let instanceKey = 0;
export const TopViewContext = React.createContext(null as TopViewContext);
const TopViewProvider: React.FC = props => {
  const instances = useRef(new Map<number, any>());
  let [children, setChildren] = useState([]);
  const isShowing = useRef(false);
  const show = (TopViewComponent: TopViewComponent) => {
    if (isShowing.current) return;
    return new Promise(resolve => {
      const key = ++instanceKey;
      isShowing.current = true;
      const onDismiss: Dismiss = data => {
        instances.current.delete(key);
        children = [...instances.current.values()];
        // console.warn('topview', children.length)
        isShowing.current = false;
        setChildren(children);
        resolve(data);
      };
      instances.current.set(
        key,
        <TopViewComponent key={key} onDismiss={onDismiss} />,
      );

      requestAnimationFrame(() => {
        setChildren([...instances.current.values()]);
      });
    });
  };

  return (
    <TopViewContext.Provider value={{show}}>
      <React.Fragment>
        {props.children}
        {[...instances.current.keys()].map(key => (
          <View
            removeClippedSubviews={false}
            onLayout={() => {
              InteractionManager.runAfterInteractions(() => {
                isShowing.current = false;
              });
            }}
            key={key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: 'transparent',
              zIndex: 100 * (key + 1),
            }}>
            {instances.current.get(key)}
          </View>
        ))}
      </React.Fragment>
    </TopViewContext.Provider>
  );
};

export default TopViewProvider;

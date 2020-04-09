import React, {useMemo, useCallback} from 'react';
import {
  ActionSheetIOSOptions,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import {TopViewProps} from 'components/topview/TopView';
import {transformSize} from 'utils/transform';
export interface ActionSheetOptions {
  colorOptions?: string[];
}

const ActionSheetContainer: React.FC<ActionSheetIOSOptions &
  TopViewProps &
  ActionSheetOptions> = ({
  title,
  message,
  options,
  destructiveButtonIndex,
  cancelButtonIndex,
  tintColor,
  colorOptions,
  ...props
}) => {
  const titleDom = useMemo(() => {
    if (!title) return null;
    return (
      <View style={s.titleBox}>
        <Text style={s.titleText}>{title}</Text>
      </View>
    );
  }, [title]);

  const messageDom = useMemo(() => {
    if (!message) return null;
    return (
      <View style={s.messageBox}>
        <Text style={s.messageText}>{message}</Text>
      </View>
    );
  }, [message]);

  return (
    <View>
      <View style={s.options}>
        {titleDom}
        {messageDom}
        {options.map((title, index) => {
          if (cancelButtonIndex === index) return null;
          const colors =
            (colorOptions &&
              colorOptions.length > index &&
              colorOptions[index]) ||
            tintColor;
          return (
            <View key={index}>
              <TouchableWithoutFeedback onPress={() => props.onDismiss(index)}>
                <View style={s.buttonBox}>
                  <Text style={[s.buttonText, {color: colors}]}>{title}</Text>
                </View>
              </TouchableWithoutFeedback>

              {index < options.length - 1 && <View style={s.line}></View>}
            </View>
          );
        })}
      </View>
      <TouchableWithoutFeedback
        key={cancelButtonIndex}
        onPress={() => props.onDismiss(cancelButtonIndex)}>
        <View style={s.cancelButtonBox}>
          <Text style={[s.buttonText, {color: tintColor}]}>
            {options[cancelButtonIndex]}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ActionSheetContainer;

const s = StyleSheet.create({
  options: {
    marginHorizontal: transformSize(18),
    borderRadius: transformSize(20),
    backgroundColor: '#fff',
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: '#E4E4E4',
    marginHorizontal: transformSize(14),
  },
  titleBox: {
    height: transformSize(108),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: transformSize(20),
    borderTopRightRadius: transformSize(20),
    borderBottomColor: '#E4E4E4',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    color: '#333',
    fontWeight: '500',
    fontSize: transformSize(30),
  },
  messageBox: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    color: '#333',
    fontSize: 12,
  },
  buttonBox: {
    height: transformSize(112),
    marginTop: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: transformSize(36),
    fontWeight: '500',
    color: '#333',
  },
  cancelButtonBox: {
    height: transformSize(112),
    marginTop: transformSize(20),
    marginBottom: transformSize(35),
    borderRadius: transformSize(20),
    marginHorizontal: transformSize(18),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

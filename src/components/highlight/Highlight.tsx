import React, {useMemo, Fragment} from 'react';
import {StyleSheet, StyleProp, TextStyle, Text} from 'react-native';
import {transformSize} from 'utils/transform';

interface IProps {
  content?: string;
  textStyle?: StyleProp<TextStyle>;
  highlightStyle?: StyleProp<TextStyle>;
  allowFontScaling?: boolean;
}
/**
 * <em>卡路里<em>还是大家发货<em>黑发<em>富士达是否
 * @param param content 文本
 */
const HighLightView: React.FC<IProps> = ({
  content,
  textStyle,
  highlightStyle,
  allowFontScaling,
}) => {
  const regex = /\<em\>.*?\<em\>/gi;
  const regexHead = /\<em\>/g;
  const regexFoot = /\<em\>/g;
  const renderEmview = (emArray: string[]) => {
    let split = content.split(regex);

    return (
      <Text
        allowFontScaling={allowFontScaling}
        style={[styles.default_text, textStyle]}>
        {split.map((value, index) => {
          if (index == split.length - 1) {
            return value;
          }
          let splitItem = emArray[index] || '';
          let noun = splitItem.replace(regexHead, '').replace(regexFoot, '');

          return (
            <Fragment>
              <Text
                allowFontScaling={allowFontScaling}
                style={[
                  styles.default_text,
                  '、' == value
                    ? {
                        color: '#333',
                      }
                    : {color: '#333'},
                  '、' == value ? highlightStyle : textStyle,
                ]}>
                {value}
              </Text>
              <Text
                allowFontScaling={allowFontScaling}
                style={[{color: '#41D283'}, highlightStyle]}>
                {noun}
              </Text>
            </Fragment>
          );
        })}
      </Text>
    );
  };

  const nounText = useMemo(() => {
    if (!content) {
      return null;
    }
    let regexArray = content.match(regex);

    if (!regexArray || !regexArray.length) {
      return (
        <Text
          allowFontScaling={allowFontScaling}
          style={[styles.default_text, textStyle]}>
          {content}
        </Text>
      );
    }
    return renderEmview(regexArray);
  }, [content]);

  return nounText;
};

const styles = StyleSheet.create({
  default_text: {
    fontSize: transformSize(32),
    color: '#1f1f1f',
    lineHeight: transformSize(48),
  },
});

export default HighLightView;

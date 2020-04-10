import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import assets from 'assets';
import Touchable from './../touchable';
import {transformSize} from '../../utils/transform';

interface Props {
  image?: any;
  preset?: keyof typeof presets;
  title?: string;
  content?: string;
  contentFontSize?: number;
  contentTextAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  actionTitle?: string;
  actionTitleStyle?: TextStyle;
  actionViewStyle?: TextStyle;
  textColor?: string;
  style?: any;
  onAction?: () => void;
}
interface MessagePreset {
  image: string;
  content: string;
}

const presets: {[key: string]: MessagePreset} = {
  'no-address': {
    image: require('./images/no_address.png'),
    content: '您还没有填写收货地址哦~',
  },
  'no-cart': {
    image: require('./images/no_cart.png'),
    content: '购物车竟然是空的~',
  },
  'no-collect': {
    image: require('./images/no_collect.png'),
    content: '暂无收藏内容~',
  },
  'no-comment': {
    image: require('./images/no_comment.png'),
    content: '暂无评论',
  },
  'no-course': {
    image: require('./images/no_course.png'),
    content: '您还没有课程哦~',
  },
  'no-data': {
    image: require('./images/no_data.png'),
    content: '暂无相关数据',
  },
  'no-earnings': {
    image: require('./images/no_earnings.png'),
    content: '暂无收益数据，要加把力啦~',
  },
  'no-follow': {
    image: require('./images/no_follow.png'),
    content: '还没有关注~',
  },
  'no-message': {
    image: require('./images/no_message.png'),
    content: '哎呀，竟然一条消息也没有~',
  },
  'no-network': {
    image: require('./images/no_network.png'),
    content: '内容加载失败，请检查网络',
  },
  'no-order': {
    image: require('./images/no_order.png'),
    content: '您目前没有订单哦~',
  },
  'no-report': {
    image: require('./images/no_report.png'),
    content: '您目前没有报告哦~',
  },
  'no-search': {
    image: require('./images/no_search.png'),
    content: '未搜索到内容',
  },
  'sold-out': {
    image: require('./images/no_data.png'),
    content: '商品过期不存在~',
  },
  shield: {
    image: require('./images/no_data.png'),
    content: '内容已下架',
  },
  'request-delete': {
    image: require('./images/no_cart.png'),
    content: '访问内容被删除！',
  },
  'request-fail': {
    image: require('./images/no_data.png'),
    content: '页面错误！',
  },
};

const Indictor: React.FC<Props> = ({
  image,
  preset,
  title,
  content,
  actionTitle,
  contentFontSize = transformSize(32),
  textColor = 'black',
  contentTextAlign = 'center',
  onAction,
  style = {paddingVertical: transformSize(250)},
  ...props
}) => {
  const [config, setConfig] = useState({} as any);
  const handleAction = () => {
    if (!onAction) {
      throw new Error('`onAction` is required if there is an action button.');
    }

    onAction();
  };
  useEffect(() => {
    if (preset) {
      setConfig(presets[preset] || {});
    } else {
      setConfig({
        image: image,
        title: title,
        content: content,
        actionTitle: actionTitle,
      });
    }
  }, [preset, image, title, content, actionTitle]);

  const renderImage = () => {
    return config.image ? (
      <Image source={config.image} style={s.image} />
    ) : null;
  };
  const renderTitle = () => {
    return config.title ? <Text style={s.title}>{config.title}</Text> : null;
  };

  const renderContent = () => {
    return config.content ? (
      <Text
        style={[
          s.content,
          {
            color: textColor,
            textAlign: contentTextAlign,
            fontSize: contentFontSize,
            lineHeight: transformSize(51 * 2 * 0.5),
          },
        ]}>
        {config.content}
      </Text>
    ) : null;
  };
  const actionButton = () => {
    return actionTitle ? (
      <Touchable
        activeOpacity={1}
        onPress={handleAction}
        style={[s.actionButton, props.actionViewStyle]}>
        <Text
          style={[
            {
              color: '#1f1f1f',
              fontSize: transformSize(32),
              paddingHorizontal: transformSize(38),
            },
            props.actionTitleStyle,
          ]}>
          {actionTitle}
        </Text>
      </Touchable>
    ) : null;
  };
  return (
    <View style={[s.main].concat(style)}>
      {renderImage()}
      {renderTitle()}
      {renderContent()}
      {actionButton()}
    </View>
  );
};
export default Indictor;

const s = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: transformSize(526),
    height: transformSize(500),
    // marginBottom: transformSize(30),
  },
  title: {
    fontSize: transformSize(36),
    marginBottom: transformSize(20),
  },
  content: {
    paddingHorizontal: transformSize(50),
    fontSize: transformSize(30),
    lineHeight: transformSize(42),
    textAlign: 'center',
    color: '#1f1f1f',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: transformSize(58),
    borderWidth: transformSize(1),
    borderColor: '#CDCDCD',
    borderRadius: transformSize(10),
    marginTop: transformSize(40),
  },
});

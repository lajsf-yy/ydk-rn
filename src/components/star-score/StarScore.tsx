import React, { useState, useEffect } from 'react'
import { View, TextStyle } from 'react-native'
import { transformSize } from 'utils/transform'
import Touchable from 'components/touchable'
import Icon from '../icon'


export interface StarScoreProps {
  iconName?: string
  iconSize?: number
  defaultIndex?: number
  defaultTotalScore?: number
  activeIconName?: string
  selectIndex?: (index: number) => void
  disabled?: boolean
  iconStyle?: TextStyle
}

const StarScore: React.FC<StarScoreProps> = ({
  iconName = 'star-large',
  activeIconName = 'star-full',
  iconSize = 20,
  defaultIndex = 0,
  defaultTotalScore = 5,
  selectIndex = (index: number) => {},
  disabled = false,
  iconStyle = { marginRight: transformSize(20) },
}) => {
  let [totalScore, setTotalScore] = useState(defaultTotalScore)
  let [currentScore, setCurrentScore] = useState(defaultIndex)

  useEffect(() => {
    setCurrentScore(defaultIndex)
  }, [defaultIndex])

  const renderBody = () => {
    let images = []
    for (var i = 1; i <= totalScore; i++) {
      let currentCount = i
      images.push(
        <View key={'i' + i}>
          <Touchable
            disabled={disabled}
            activeOpacity={1}
            onPress={i => {
              score(currentCount)
            }}>
            <Icon
              size={iconSize}
              name={i <= currentScore ? activeIconName : iconName}
              style={[
                {
                  color: i <= currentScore ? '#FFBC25' : '#ccc',
                },
                iconStyle,
              ]}></Icon>
          </Touchable>
        </View>,
      )
    }
    return images
  }

  const score = (i: number) => {
    setCurrentScore(i)
    selectIndex && selectIndex(i)
  }

  return <View style={{ flexDirection: 'row', height: iconSize }}>{renderBody()}</View>
}

export default StarScore

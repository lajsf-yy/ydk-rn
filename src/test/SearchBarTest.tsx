import React, { useState } from 'react';
import {View, AsyncStorage, ScrollView, NativeSyntheticEvent, TextInputChangeEventData, Text} from 'react-native';
import Switch from 'components/switch';
import Button from 'components/button';
import SearchBar from 'components/search-bar';

const SearchBarTest = () => {
    const [value, setValue] = useState("")

    /**
     * 禁用disabled
     */
    const renderDisabled = () => {
        return (
            <SearchBar disabled fixed></SearchBar>
        )
    }

    /**
     * 不展示右侧视图
     */
    const renderSearchBar = () => {
        return (
            <SearchBar 
            placeholder="输入需要搜索的食物"
            rightView={null} 
            value={value} 
            onClose={() => {
                setValue("")
            }}
            onChange={(e:  NativeSyntheticEvent<TextInputChangeEventData>) => {
            setValue(e.nativeEvent.text)
        }}></SearchBar>
        )
    }

    /**
     * 自定义右侧视图
     */
    const renderCustom = () => {
        return (
            <SearchBar 
            placeholder="输入需要搜索的食物"
            rightView={<Text>你好</Text>} 
            value={value} 
            onClose={() => {
                // onclose 事件
                setValue("")
            }}
            onChange={(e:  NativeSyntheticEvent<TextInputChangeEventData>) => {
            setValue(e.nativeEvent.text)
        }}></SearchBar>
        )
    }

    /**
     * 自定义右侧视图， 不显示清除按钮
     * 自定义style样式
     */
    const renderCustom2 = () => {
        return (
            <SearchBar 
                textInputStyle={{backgroundColor: "red"}}
                searchBoxStyle={{backgroundColor: 'pink'}}
                placeholder="输入需要搜索的食物"
                rightView={<Text>你好</Text>} 
                value={value} 
                onChange={(e:  NativeSyntheticEvent<TextInputChangeEventData>) => {
                setValue(e.nativeEvent.text)
        }}></SearchBar>
        )
    }


    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            {renderDisabled()}
            {renderSearchBar()}
            {renderCustom()}
            {renderCustom2()}
        </View>
 
    )
}

export default SearchBarTest
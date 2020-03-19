import React, { useState } from 'react';
import {View, AsyncStorage, ScrollView, NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import Switch from 'components/switch';
import Button from 'components/button';
import SearchBar from 'components/search-bar';

const SearchBarTest = () => {
    const [value, setValue] = useState("")

    return (
        <View>
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
            <SearchBar disabled fixed></SearchBar>
        </View>
 
    )
}

export default SearchBarTest
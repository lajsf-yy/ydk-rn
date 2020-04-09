/**
 * @format
 */
import React from 'react';
import {AppRegistry, Alert, View} from 'react-native';
import {name as appName} from './../app.json';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TopViewProvider from 'components/topview/TopView';
import Screens from "./test"
import Home from './home'
const Stack = createStackNavigator();

const App = () => {
  return (
    <TopViewProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={appName}>
          {
            Object.keys(Screens).map((key) => {
              return  <Stack.Screen name={key} component={Screens[key]} key={key}></Stack.Screen>
            })
          }
        <Stack.Screen name={appName} component={Home}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </TopViewProvider>

  );
}

export default App;

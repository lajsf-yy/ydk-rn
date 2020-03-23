/**
 * @format
 */
import React from 'react';
import {AppRegistry, Alert} from 'react-native';
import App from './src/app';
import TopView from "./src/components/topview"
import {name as appName} from './app.json';
// const providers = [TopView]
// const setWrapperComponent = (Component) => {
//     const withProviders  = props => {
//         let children = <Component {...props} />
//         for (let Provider of providers) {
//           children = <Provider {...props}>{children}</Provider>
//         }
//         return <React.Fragment>{children}</React.Fragment>
//       }
//       return withProviders
// }

AppRegistry.registerComponent(appName, () => App);
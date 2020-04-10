/**
 * @format
 */
import React from 'react';
import {AppRegistry, Alert} from 'react-native';
import App from './example/app';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

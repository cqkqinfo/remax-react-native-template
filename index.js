/**
 * @format
 */

import './polyfills';
import { AppRegistry } from 'react-native';
import App from './src/app';
import SplashScreen from 'react-native-splash-screen';

AppRegistry.registerComponent('rndemo', () => {
  SplashScreen.hide();
  return App;
});

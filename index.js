/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/app.rn';
import { name as appName } from './app.json';
import SplashScreen from 'react-native-splash-screen';

AppRegistry.registerComponent(appName, () => {
  SplashScreen.hide();
  return App;
});

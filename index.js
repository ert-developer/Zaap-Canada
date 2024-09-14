/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Settings} from 'react-native-fbsdk-next';
import {LogBox} from 'react-native';

// Ask for consent first if necessary
// Possibly only do this for iOS if no need to handle a GDPR-type flow
Settings.initializeSDK();
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
AppRegistry.registerComponent(appName, () => App);

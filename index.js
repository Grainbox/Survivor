/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App/App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import { playbackService } from './hooks/context/service.js';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);

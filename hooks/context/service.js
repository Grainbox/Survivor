/**
 * This is the code that will run tied to the player.
 *
 * The code here might keep running in the background.
 *
 * You should put everything here that should be tied to the playback but not the UI
 * such as processing media buttons or analytics
 */

import TrackPlayer, {AppKilledPlaybackBehavior, Event, RepeatMode} from 'react-native-track-player';

export async function playbackService (currentSound, setIsPlaying) {
    TrackPlayer.addEventListener(Event.RemotePause, async () => {
        if (currentSound && currentSound._loaded) {
            await currentSound.pauseAsync();
            setIsPlaying(false);
            await TrackPlayer.pause();
        }
    });
    TrackPlayer.addEventListener(Event.RemotePlay, async () => {
        console.log('RemotePlay');
        if (currentSound && currentSound._loaded) {
            await currentSound.playAsync();
            await TrackPlayer.setVolume(0);
            setIsPlaying(true);
            await TrackPlayer.play();
        }
    });
    TrackPlayer.addEventListener(Event.RemoteStop, async () => {
        if (currentSound && currentSound._loaded) {
            await currentSound.stopAsync();
            setIsPlaying(false);
            await TrackPlayer.stop();
        }
    });
}


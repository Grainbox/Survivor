// context/PodcastActions.js
import { useNavigation } from '@react-navigation/native';

export const usePodcastActions = (state) => {
    const navigation = useNavigation();

    // You can destructure state and setters here for cleaner code

    const {
        connected,
        setConnected,
        token,
        setToken,
        id,
        setId,
        email,
        setEmail,
        password,
        setPassword,
        employees,
        setEmployees,
        employeeDetails,
        setEmployeeDetails,
        musicplaying,
        setMusicIsPlaying,
        track,
        setTrack,
        playbackPosition,
        setplaybackPosition,
        trackID,
        setTrackID
    } = state;

    return {
        connected,
        setConnected,
        token,
        setToken,
        id,
        setId,
        email,
        setEmail,
        password,
        setPassword,
        employees,
        setEmployees,
        employeeDetails,
        setEmployeeDetails,
        musicplaying,
        setMusicIsPlaying,
        track,
        setTrack,
        playbackPosition,
        setplaybackPosition,
        trackID,
        setTrackID
    };
};

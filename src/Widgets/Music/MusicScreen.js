import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import TrackPlayer, { Capability, usePlaybackState } from 'react-native-track-player';
import { SurvivorContext } from '../../../hooks/context/SurvivorContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from "../../../hooks/useTheme";
import { darkTheme, lightTheme } from "../../../hooks/theme";
import getStyles from "./MusicScreen.styles";
import { X_RAPID_API_KEY } from "@env";

function MusicScreen() {
    const playbackState = usePlaybackState();
    const [viewStage, setViewStage] = useState(1);
    const playerInitialized = useRef(false); // Using useRef to persist the value across renders
    const survivorContext = useContext(SurvivorContext);
    const { darkMode } = useTheme();
    const theme = darkMode ? darkTheme : lightTheme;
    const styles = getStyles(theme);

    useEffect(() => {
        async function fetchMusic() {
            try {
                if (survivorContext.track == null) {
                    console.log(survivorContext.trackID);
                    let response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${survivorContext.trackID}`, {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': X_RAPID_API_KEY,
                            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
                        }
                    });
                    let data = await response.json();
                    survivorContext.setTrack(data);
                }
            } catch (error) {
                console.error("Error fetching music:", error);
            }
        }

        fetchMusic();

        return () => {
            //TrackPlayer.destroy();  // Clean-up function
        };
    }, [survivorContext.trackID]);

    useEffect(() => {
        // Save playback position when unmounting
        return async () => {
            if (survivorContext.track) {
                const position = await TrackPlayer.getPosition();
                survivorContext.setplaybackPosition(position);
            }
        };
    }, []);

    useEffect(() => {
        // Initialize the player when the component mounts
        async function initializePlayer() {
            try {
                if (!survivorContext.track) {
                    await TrackPlayer.setupPlayer();
                    survivorContext.setMusicIsPlaying(true);
                }
            } catch (error) {
                console.error("Error initializing the player:", error);
            }
        }

        initializePlayer();
    }, [survivorContext.track]);


    useEffect(() => {
        // Update the track when the 'track' state changes
        async function updateTrack() {
            if (survivorContext.track) {
                try {
                    if (survivorContext.track && survivorContext.playbackPosition !== null) {
                        await TrackPlayer.seekTo(survivorContext.playbackPosition);
                    }
                    await TrackPlayer.add({
                        id: survivorContext.track.id.toString(),
                        url: survivorContext.track.preview,
                        title: survivorContext.track.title,
                        artist: survivorContext.track.artist.name,
                        artwork: survivorContext.track.album.cover_medium,
                    });
                    await TrackPlayer.updateOptions({
                        capabilities: [
                            Capability.Play,
                            Capability.Pause,
                            Capability.Stop,
                        ],

                        // Capabilities that will show up when the notification is in the compact form on Android
                        compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
                    });
                    await TrackPlayer.play(); // Autoplay after setting track
                } catch (error) {
                    console.error("Error setting the track:", error);
                }
            }
        }

        updateTrack();
    }, [survivorContext.track]);




    const playTrack = async () => {
        await TrackPlayer.play();
    };

    const pauseTrack = async () => {
        await TrackPlayer.pause();
    };

    const nextTrack = async () => {
        const nextID = (parseInt(survivorContext.trackID) + 1).toString();
        survivorContext.setTrackID(nextID);

        try {
            let response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${nextID}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': X_RAPID_API_KEY,
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
                }
            });
            let data = await response.json();
            survivorContext.setTrack(data);
            survivorContext.setplaybackPosition(0);
            await TrackPlayer.reset();
            await TrackPlayer.play();
        } catch (error) {
            console.error("Error fetching music:", error);
        }
    };

    const prevTrack = async () => {
        const nextID = (parseInt(survivorContext.trackID) - 1).toString();
        survivorContext.setTrackID(nextID);

        try {
            let response = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${nextID}`, {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': X_RAPID_API_KEY,
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
                }
            });
            let data = await response.json();
            survivorContext.setTrack(data);
            survivorContext.setplaybackPosition(0);
            await TrackPlayer.reset();
            await TrackPlayer.play();
        } catch (error) {
            console.error("Error fetching music:", error);
        }
    };

    if (!survivorContext.track) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <ImageBackground source={{ uri: survivorContext.track.album.cover_medium }} style={styles.albumCover}>
                    <View style={styles.infos}>
                        <View style={{ flexDirection: 'column'}}>
                            <Text style={styles.textInfo}>{survivorContext.track.album.title}</Text>
                            <Text style={styles.textInfo}>{survivorContext.track.release_date}</Text>
                            <Text style={styles.textInfo}>{Math.floor(survivorContext.track.duration / 60)}:{survivorContext.track.duration % 60}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            <View style={{ flexDirection: 'column', top: '15%'}}>
                <Text style={styles.text}>{survivorContext.track.title}</Text>
                <Text style={styles.text}>{survivorContext.track.artist.name}</Text>

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: '40%'  }}>
                <TouchableOpacity onPress={prevTrack}>
                    <Icon name={'arrow-left'} size={100} color={theme.text} style={{ marginRight: 30 }} />
                </TouchableOpacity>
                {survivorContext.musicplaying && (
                    <Icon name={'pause'} size={100} color={theme.text} onPress={() => { pauseTrack(); survivorContext.setMusicIsPlaying(false); }} />
                )}
                {!survivorContext.musicplaying && (
                    <Icon name={'play'} size={100} color={theme.text} onPress={() => { playTrack(); survivorContext.setMusicIsPlaying(true); }} />
                )}
                <TouchableOpacity onPress={nextTrack}>
                    <Icon name={'arrow-right'} size={100} color={theme.text} style={{ marginLeft: 30 }}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default MusicScreen;

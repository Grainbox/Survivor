import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { RTCPeerConnection, RTCView, mediaDevices } from 'react-native-webrtc';

const CallScreen = () => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isCalling, setIsCalling] = useState(false);
    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    const pc = new RTCPeerConnection(configuration);

    useEffect(() => {
        // Set up local stream (you may need to request camera/microphone permissions)
        mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then((stream) => {
                setLocalStream(stream);
                stream.getTracks().forEach((track) => {
                    pc.addTrack(track, stream);
                });

            })
            .catch((error) => console.error('Error accessing media devices:', error));

        // Set up event listeners for the Peer Connection
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                // Send the ICE candidate to the remote peer (signaling server)
            }
        };

        pc.onaddstream = (event) => {
            setRemoteStream(event.stream);
        };

        // Implement signaling and negotiation with the remote peer

        // Implement call termination logic
        const endCall = () => {
            // Close the Peer Connection and release resources
            pc.close();
            localStream.getTracks().forEach((track) => track.stop());
            setLocalStream(null);
            setRemoteStream(null);
        };

        // Clean up resources on component unmount
        return () => {
            endCall();
        };
    }, []);

    const startCall = () => {
        // Implement logic to initiate a call
        setIsCalling(true);

        // Create and send an offer to the remote peer
        pc.createOffer()
            .then((offer) => pc.setLocalDescription(offer))
            .then(() => {
                // Send the offer to the remote peer (signaling server)
            })
            .catch((error) => console.error('Error creating offer:', error));
    };

    const endCall = () => {
        // Implement logic to terminate a call
        setIsCalling(false);

        // Close the Peer Connection and release resources
        pc.close();
        localStream.getTracks().forEach((track) => track.stop());
        setLocalStream(null);
        setRemoteStream(null);
    };

    return (
        <View style={styles.container}>
            {localStream && <RTCView streamURL={localStream.toURL()} style={styles.localVideo} />}
            {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={styles.remoteVideo} />}
            {isCalling ? (
                <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
                    <Text>End Call</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.callButton} onPress={startCall}>
                    <Text>Start Call</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    localVideo: {
        width: 200,
        height: 150,
        position: 'absolute',
        top: 20,
        left: 20,
    },
    remoteVideo: {
        width: 200,
        height: 150,
        position: 'absolute',
        top: 20,
        right: 20,
    },
    callButton: {
        backgroundColor: 'green',
        padding: 16,
        borderRadius: 50,
        position: 'absolute',
        bottom: 40,
    },
    endCallButton: {
        backgroundColor: 'red',
        padding: 16,
        borderRadius: 50,
        position: 'absolute',
        bottom: 40,
    },
});

export default CallScreen;

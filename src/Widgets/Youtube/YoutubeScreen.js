import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet, Linking } from 'react-native';
import axios from 'axios';
import { YOUTUBE_API_KEY } from "@env";

function YoutubeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  const searchYoutube = () => {
    if (!searchTerm) {
      return; // Do not search if the search term is empty
    }

    // Make an Axios GET request to fetch YouTube videos
    axios
      .get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: YOUTUBE_API_KEY,
          q: searchTerm,
          part: 'snippet',
          maxResults: 10, // You can adjust the number of results
          type: 'video',
        },
      })
      .then((response) => {
        // Handle the successful response and set the videos state
        setVideos(response.data.items);
        setError(null);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        setVideos([]);
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YouTube Video Search</Text>
      <TextInput
        style={styles.input}
        placeholder="Search YouTube"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <Button title="Search" onPress={searchYoutube} />
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => (
          <View style={styles.videoItem}>
            <Image
              style={styles.videoThumbnail}
              source={{ uri: item.snippet.thumbnails.medium.url }}
            />
            <Text
              style={styles.videoTitle}
              onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${item.id.videoId}`)}
            >
              {item.snippet.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  videoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  videoThumbnail: {
    width: 120,
    height: 90,
    marginRight: 10,
  },
  videoTitle: {
    fontSize: 16,
    flex: 1,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default YoutubeScreen;

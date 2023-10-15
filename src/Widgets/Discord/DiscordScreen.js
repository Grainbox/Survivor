import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { DISCORD_USER_ID, DISCORD_API_TOKEN } from "@env";

function DiscordScreen() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const discordUserId = DISCORD_USER_ID;

    const discordApiToken = DISCORD_API_TOKEN;

    axios
      .get(`https://discord.com/api/v10/users/${discordUserId}`, {
        headers: {
          Authorization: `Bearer ${discordApiToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        setError(null);
      })
      .catch((error) => {
        setUserData(null);
        setError(error.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discord User Profile</Text>
      {error && <Text>Error: {error}</Text>}
      {userData && (
        <View style={styles.profile}>
          <Image
            style={styles.avatar}
            source={{ uri: `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` }}
          />
          <Text style={styles.username}>Username: {userData.username}</Text>
          <Text style={styles.discriminator}>Discriminator: #{userData.discriminator}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profile: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  discriminator: {
    fontSize: 16,
  },
});

export default DiscordScreen;

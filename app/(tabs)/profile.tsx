import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { router } from 'expo-router';

export default function Profile() {
  const [user, setUser] = useState<any>(null); // State for the current user
  const [randomAvatarUrl, setRandomAvatarUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();
    // Listen for authentication state changes (user sign-in/sign-out)
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser); // Set the user info from Firebase
        // Set the random avatar URL
        setRandomAvatarUrl(
          `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}`
        );
      } else {
        setUser(null); // No user signed in
      }
      setIsLoading(false); // Set loading to false once the user info is fetched
    });

    return () => {
      unsubscribe(); // Clean up the listener on unmount
    };
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7fbbf0" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please log in to view your profile.</Text>
      </View>
    );
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        router.push('/auth/sign-in');
      })
      .catch((error) => {
        console.error('Error signing out: ', error);
      });
  };

  const confirmSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'OK', onPress: handleSignOut },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      {/* User Avatar */}
      <View style={styles.avatarContainer}>
        {randomAvatarUrl ? (
          <Image source={{ uri: randomAvatarUrl }} style={styles.avatar} />
        ) : (
          <ActivityIndicator
            size="small"
            color="#7fbbf0"
            style={styles.avatar}
          />
        )}
      </View>

      {/* User Info */}
      <Text style={styles.username}>{user.displayName || 'Anonymous'}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {/* Additional User Info (optional) */}
      <Text style={styles.text}>Welcome to your profile!</Text>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={confirmSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#666',
  },
  signOutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF4C4C',
    borderRadius: 5,
  },
  signOutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

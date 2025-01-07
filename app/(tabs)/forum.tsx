import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  DrawerLayoutAndroid,
  RefreshControl,
  Alert,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import MainForumPage from '../forum/main-forum';
import { db } from '@/configs/FirebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const ForumScreen = () => {
  const [channels, setChannels] = useState<any[]>([]);
  const [currentChannel, setCurrentChannel] = useState<any | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    // After channels are fetched and state is updated, set the current channel
    if (channels.length > 0) {
      // Set current channel to the one named 'General'
      const generalChannel = channels.find(
        (channel) => channel.name === 'General'
      );
      console.log('generalChannel', generalChannel);
      setCurrentChannel(generalChannel || channels[0]);
    }
  }, [channels]); // This useEffect depends on the channels state

  const initialize = async () => {
    await fetchChannels();
    setIsRefreshing(false);
  };

  const fetchChannels = async () => {
    try {
      // Query to get posts for the specific channel
      const channelsQuery = query(
        collection(db, 'Channels'),
        orderBy('createdAt')
      );

      const querySnapshot = await getDocs(channelsQuery);
      const fetchedChannels: any[] = [];
      querySnapshot.forEach((doc) => {
        const channelData = doc.data();
        const channel = {
          id: doc.id,
          name: channelData.name,
          description: channelData.description,
          createdAt: channelData.createdAt.toDate(),
        };
        fetchedChannels.push(channel);
      });

      setChannels(fetchedChannels); // This triggers the useEffect to run
    } catch (e) {
      console.error('Error fetching channels:', e);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchChannels(); // Refresh the channels data
    setIsRefreshing(false);
  };

  const renderDrawerContent = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerHeader}>Kênh bạn theo dõi</Text>
      {channels.map((channel) => (
        <TouchableOpacity
          key={channel.id}
          style={styles.drawerItem}
          onPress={() => setCurrentChannel(channel)} // Set the current channel
        >
          <Text style={styles.drawerItemText}>#{channel.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => router.push('/forum/create-channel')}
      >
        <Text style={styles.drawerItemText}>Tạo kênh mới</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={renderDrawerContent}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Image
            source={require('@/assets/images/icon.png')}
            style={{ width: 52, height: 52 }}
          />
          <Text
            style={{
              fontFamily: 'roboto-bold',
              fontSize: 33,
            }}
          >
            Forum
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/forum/create-channel')}
          >
            <Ionicons name="add-circle" size={50} color="black" />
          </TouchableOpacity>
        </View>
        {currentChannel ? (
          <MainForumPage
            channel={currentChannel}
            onSubscriptionChanged={(channel, isSubscribed) => {
              Alert.alert(
                `Subscription Updated`,
                `You are now ${isSubscribed ? 'subscribed to' : 'unsubscribed from'} ${channel.name}.`
              );
            }}
          />
        ) : isRefreshing ? (
          <ActivityIndicator size="large" color="#7fbbf0" />
        ) : (
          <Text style={styles.noChannelText}>No channel selected</Text>
        )}
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#121212',
  },
  drawerHeader: {
    color: 'white',
    fontSize: 18,
    padding: 16,
  },
  drawerItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  drawerItemText: {
    color: 'white',
  },
  noChannelText: {
    color: Colors.GRAY,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ForumScreen;

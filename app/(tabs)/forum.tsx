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

interface Channel {
  id: string;
  name: string;
  description: string;
}

const mockChannels: Channel[] = [
  { id: '1', name: 'General', description: 'Discuss anything here!' },
  { id: '2', name: 'Tech', description: 'Explore the latest in tech.' },
  { id: '3', name: 'Gaming', description: 'Talk about your favorite games.' },
];

const ForumScreen = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    setChannels(mockChannels); // Load mock channels
    if (mockChannels.length > 0) {
      setCurrentChannel(mockChannels[0]); // Default to the first channel
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    initialize(); // Simulate refreshing
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
          <Text style={styles.header}>Forum</Text>
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

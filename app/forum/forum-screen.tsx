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
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

interface Channel {
  id: string;
  name: string;
}

const ForumScreen = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    Record<string, boolean>
  >({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    await getChannelsByUser();
  };

  const getChannelsByUser = async () => {
    try {
      // const fetchedChannels = await channelCubit.getListChannelByUser(0);
      // setChannels(fetchedChannels);
      // if (fetchedChannels.length > 0) {
      //   setCurrentChannel(fetchedChannels[0]);
      // }
    } catch (error) {
      Alert.alert('Error', `Error fetching channels: ${error}`);
    }
  };

  const toggleSubscription = async (channel: Channel) => {
    try {
      const payload = { channelId: channel.id };
      if (subscriptionStatus[channel.id]) {
        // await channelCubit.unsubscribeChannel(payload);
      } else {
        // await channelCubit.subscribeChannel(payload);
      }
      setSubscriptionStatus((prevStatus) => ({
        ...prevStatus,
        [channel.id]: !prevStatus[channel.id],
      }));
    } catch (error) {
      Alert.alert('Error', `Error toggling subscription: ${error}`);
    }
  };

  const onChannelTap = async (channel: Channel) => {
    try {
      // const channelDetail = await channelCubit.getChannelById(channel.id);
      // if (channelDetail) {
      //   setCurrentChannel(channelDetail);
      // }
    } catch (error) {
      Alert.alert('Error', `Error fetching channel details: ${error}`);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await getChannelsByUser();
    setIsRefreshing(false);
  };

  const renderDrawerContent = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerHeader}>Kênh bạn theo dõi</Text>
      {channels.map((channel) => (
        <TouchableOpacity
          key={channel.id}
          style={styles.drawerItem}
          onPress={() => {
            onChannelTap(channel);
          }}
        >
          <Text style={styles.drawerItemText}>#{channel.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() =>
          navigation.navigate('CreateChannelScreen', {
            channelCubit,
            onChannelCreated: getChannelsByUser,
          })
        }
      >
        <Text style={styles.drawerItemText}>Tạo kênh mới</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() =>
          navigation.navigate('SearchScreen', {
            channelCubit,
            onChannelSelected: onChannelTap,
          })
        }
      >
        <Text style={styles.drawerItemText}>Tìm kiếm</Text>
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
        <Text style={styles.header}>Forum</Text>
        {currentChannel ? (
          <View style={styles.content}>
            <Text style={styles.channelHeader}>#{currentChannel.name}</Text>
            <FlatList
              data={currentChannel.posts || []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity>
                  <Text style={styles.postItem}>{item.content}</Text>
                </TouchableOpacity>
              )}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          </View>
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
    backgroundColor: '#121212',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    padding: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  channelHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  postItem: {
    fontSize: 16,
    color: 'white',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  noChannelText: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#181818',
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
});

export default ForumScreen;

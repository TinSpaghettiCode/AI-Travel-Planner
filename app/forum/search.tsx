import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Channel {
  id: string;
  name: string;
}

interface ChannelCubit {
  getListChannel: (
    currentIndex: number,
    searchQuery: string
  ) => Promise<Channel[]>;
}

interface SearchChannelScreenProps {
  channelCubit: ChannelCubit;
  onChannelSelected: (channel: Channel) => void;
}

const SearchChannelScreen: React.FC<SearchChannelScreenProps> = ({
  channelCubit,
  onChannelSelected,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [currentChannelIndex, setCurrentChannelIndex] = useState<number>(0);

  const getChannels = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const fetchedChannels = await channelCubit.getListChannel(
        currentChannelIndex,
        searchQuery
      );
      setChannels(fetchedChannels);
    } catch (e) {
      console.error('Error fetching channels:', e);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            /* Handle Back Button Press */
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Tìm kiếm kênh</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Nhập mã kênh"
          placeholderTextColor="#ACACAC"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={getChannels}
        />
        <TouchableOpacity onPress={getChannels} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {isSearching ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <>
          {channels.length > 0 ? (
            <FlatList
              data={channels}
              keyExtractor={(item) => item.id}
              renderItem={({ item: channel }) => (
                <TouchableOpacity
                  style={styles.channelItem}
                  onPress={() => {
                    onChannelSelected(channel);
                  }}
                >
                  <Text style={styles.channelName}>#{channel.name}</Text>
                  <Ionicons name="arrow-forward" size={16} color="grey" />
                </TouchableOpacity>
              )}
            />
          ) : (
            searchQuery && (
              <Text style={styles.noResultsText}>Không tìm thấy kênh nào.</Text>
            )
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#333333',
    color: 'white',
    padding: 10,
    borderRadius: 4,
    fontSize: 18,
  },
  searchButton: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2C2C2C',
    borderRadius: 4,
    marginBottom: 10,
    alignItems: 'center',
  },
  channelName: {
    color: 'white',
    fontSize: 18,
    flex: 1,
  },
  noResultsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SearchChannelScreen;

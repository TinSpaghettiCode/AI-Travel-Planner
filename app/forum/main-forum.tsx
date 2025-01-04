import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import HashtagTopicCard from './HashtagTopicCard';
import PostCard from './PostCard';
import { db } from '@/configs/FirebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Post {
  id: string;
  hashtags: string[];
  createdAt: Date;
  content: string;
  userName: string;
  imageUrls: string[];
  likes: number;
  comments: string[];
}

interface MainForumPageProps {
  channel: any;
  onSubscriptionChanged: (channel: any, isSubscribed: boolean) => void;
}

const MainForumPage: React.FC<MainForumPageProps> = ({
  channel,
  onSubscriptionChanged,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [sortOption, setSortOption] = useState<'new' | 'hot'>('new');

  const fetchPostsForChannel = async (channelId: string, sortBy: string) => {
    try {
      const postsQuery = query(
        collection(db, 'Posts'),
        where('channelId', '==', channelId),
        orderBy(sortBy === 'new' ? 'createdAt' : 'likes', 'desc')
      );

      const querySnapshot = await getDocs(postsQuery);
      const fetchedPosts: Post[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        hashtags: doc.data().hashtags || [],
        createdAt: doc.data().createdAt.toDate(),
        content: doc.data().content,
        userName: doc.data().userName,
        imageUrls: doc.data().imageUrls || [],
        likes: doc.data().likes || 0,
        comments: doc.data().comments || [],
      }));

      setPosts(fetchedPosts);
    } catch (e) {
      console.error('Error fetching posts:', e);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await fetchPostsForChannel(channel.id, sortOption);
    } catch (e) {
      console.error('Initialization error:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchPostsForChannel(channel.id, sortOption);
    } catch (e) {
      console.error('Error refreshing posts:', e);
    } finally {
      setIsRefreshing(false);
    }
  };

  const toggleSubscription = () => {
    setIsSubscribed((prev) => !prev);
    onSubscriptionChanged(channel, !isSubscribed);
  };

  const likePost = async (postId: string) => {
    try {
      const postRef = doc(db, 'Posts', postId);
      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      );
      setPosts(updatedPosts);
      await updateDoc(postRef, {
        likes: updatedPosts.find((post) => post.id === postId)?.likes,
      });
    } catch (e) {
      console.error('Error liking post:', e);
    }
  };

  const unlikePost = async (postId: string) => {
    try {
      const postRef = doc(db, 'Posts', postId);
      const updatedPosts = posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes - 1 } : post
      );
      setPosts(updatedPosts);
      await updateDoc(postRef, {
        likes: updatedPosts.find((post) => post.id === postId)?.likes,
      });
    } catch (e) {
      console.error('Error unliking post:', e);
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      postData={item}
      onLikePressed={() => likePost(item.id)}
      onUnlikePressed={() => unlikePost(item.id)}
    />
  );

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [channel.id, sortOption])
  );

  const changeSortOption = (option: 'new' | 'hot') => {
    setSortOption(option);
  };

  return isLoading ? (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color="#7fbbf0" />
    </View>
  ) : (
    <FlatList
      ListHeaderComponent={
        <>
          <HashtagTopicCard
            hashtag={channel.name}
            description={channel.description}
            isSubscribed={isSubscribed}
            onCreatePost={() =>
              router.push({
                pathname: '/forum/create-post',
                params: { params: JSON.stringify(channel) },
              })
            }
            onToggleSubscription={toggleSubscription}
          />
          {/* Posts Header and Sort Filter */}
          <View style={styles.filterContainer}>
            <View style={styles.sortButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'new' && styles.activeSortButton,
                ]}
                onPress={() => changeSortOption('new')}
              >
                <MaterialCommunityIcons
                  name="clock-time-four"
                  size={24}
                  color={sortOption === 'new' ? 'white' : 'black'}
                />
                <Text
                  style={[
                    styles.sortButtonText,
                    sortOption === 'new' && { color: 'white' },
                  ]}
                >
                  New Posts
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortButton,
                  sortOption === 'hot' && styles.activeSortButton,
                ]}
                onPress={() => changeSortOption('hot')}
              >
                <MaterialCommunityIcons
                  name="fire"
                  size={24}
                  color={sortOption === 'hot' ? 'white' : 'black'}
                />
                <Text
                  style={[
                    styles.sortButtonText,
                    sortOption === 'hot' && { color: 'white' },
                  ]}
                >
                  Hot Posts
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      }
      data={posts}
      renderItem={renderPost}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  filterContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  postsHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sortButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sortButtonText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },
  activeSortButton: {
    backgroundColor: '#7fbbf0',
    shadowOpacity: 0.5,
    elevation: 5,
  },
  subscriptionButton: {
    padding: 10,
    borderRadius: 5,
  },
  unsubscribeButton: {
    backgroundColor: '#FF0000',
  },
  subscribeButton: {
    backgroundColor: '#7fbbf0',
  },
});

export default MainForumPage;

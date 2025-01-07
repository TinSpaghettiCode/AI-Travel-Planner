import { router, useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
} from 'react-native';
import { ActivityIndicator, Card } from 'react-native-paper';
import { auth, db } from './../../configs/FirebaseConfig';
import { getDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import PostItem from './PostCard';

interface Comment {
  id: string;
  content: string;
  createdAt: any;
  userName: string;
}

const CommentPage = () => {
  const { params } = useLocalSearchParams();
  let post = null;
  try {
    post = JSON.parse(typeof params === 'string' ? params : '{}');
    console.log('post:', post);
  } catch (e) {
    console.error('Error parsing post:', e);
  }

  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [avatars, setAvatars] = useState<{ [key: string]: string }>({});

  const commentInputRef = useRef(null);

  const user = auth.currentUser;

  const getRandomAvatarUrl = () => {
    return `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}`;
  };

  // Generate avatar URLs for each comment when the component mounts
  useEffect(() => {
    const fetchAvatars = async () => {
      const newAvatars: { [key: string]: string } = {};
      for (const comment of comments) {
        newAvatars[comment.id] = getRandomAvatarUrl();
      }
      setAvatars(newAvatars);
    };

    fetchAvatars();
  }, [comments]);

  const addComment = async () => {
    if (!commentText.trim()) return;

    setIsLoading(true);

    const newComment: Comment = {
      id: Math.random().toString(36).substring(7),
      content: commentText,
      createdAt: Timestamp.fromDate(new Date()),
      userName: user?.email || 'Anonymous',
    };

    const updatedComments = [newComment, ...comments];
    setComments(updatedComments);
    setCommentText('');
    commentInputRef.current?.blur();

    try {
      // Update Firestore
      if (post?.id) {
        const postRef = doc(db, 'Posts', post.id);

        await updateDoc(postRef, {
          comments: updatedComments, // Ensure this structure matches Firestore schema
        });

        console.log('Comments updated successfully in Firestore.');
      } else {
        console.error('Post ID is not available.');
      }
    } catch (error) {
      console.error('Error updating comments in Firestore:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const likePost = async (postId: string) => {
    try {
      const postRef = doc(db, 'Posts', postId);

      // Get the current post data from Firestore using getDoc
      const postDoc = await getDoc(postRef);
      const postData = postDoc.data();

      if (!postData) {
        console.error('Post data not found');
        return;
      }

      const currentLikes = postData.likes || 0; // Default to 0 if likes are undefined
      const updatedLikes = isLiked ? currentLikes - 1 : currentLikes + 1;

      // Update the Firestore document
      await updateDoc(postRef, {
        likes: updatedLikes,
      });

      // Update local state
      setIsLiked(!isLiked); // Toggle the liked state
      console.log('Post liked status updated.');
    } catch (e) {
      console.error('Error liking post:', e);
    }
  };

  const timeAgo = (date: any) => {
    const timestamp =
      date instanceof Timestamp
        ? date.toDate()
        : new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
    const diff = Math.floor(
      (new Date().getTime() - timestamp.getTime()) / 1000
    );

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.actionBarTitle}>Post Details</Text>
      </View>

      <View style={{ marginTop: 8 }}>
        <PostItem
          postData={post}
          onLikePressed={() => likePost(post.id)}
          onUnlikePressed={() => likePost(post.id)}
        />
      </View>

      <View style={styles.divider} />

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.commentCard}>
            <View style={styles.commentHeader}>
              {avatars[item.id] ? (
                <Image
                  source={{ uri: avatars[item.id] }}
                  style={styles.avatar}
                  width={40}
                  height={40}
                />
              ) : (
                <ActivityIndicator size="small" color="#0000ff" />
              )}
              <View style={styles.commentContentContainer}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text style={styles.commentContent}>{item.content}</Text>
                <Text style={styles.commentTime}>
                  {timeAgo(item.createdAt)}
                </Text>
              </View>
            </View>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No comments yet.</Text>
        }
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.commentInputContainer}
      >
        <TextInput
          ref={commentInputRef}
          style={styles.textInput}
          value={commentText}
          onChangeText={setCommentText}
          placeholder="Add a comment..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.postButton} onPress={addComment}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingVertical: 8 },
  postContainer: { padding: 16 },
  postContent: { fontSize: 16, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#ccc', marginVertical: 16 },
  commentCard: { padding: 16, marginVertical: 8, marginHorizontal: 16 },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  avatar: {
    marginRight: 10,
  },
  commentContentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  userName: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  commentContent: {
    fontSize: 14,
  },
  commentTime: {
    fontSize: 12,
    color: '#888',
    position: 'absolute',
    top: 0,
    right: 0,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
  },
  postButton: { backgroundColor: '#7fbbf0', padding: 10, borderRadius: 5 },
  postButtonText: { color: '#fff', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 20 },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7fbbf0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 5,
  },
  actionBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CommentPage;

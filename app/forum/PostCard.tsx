import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface Post {
  hashtags: string[];
  applicationUser: { userName: string } | null;
  createdAt: Date;
  content: string;
  imageUrls: string[];
  likes: number;
  comments: string[];
}

interface PostItemProps {
  postData: Post;
  onLikePressed: () => void;
  onUnlikePressed: () => void;
  onCommentPressed: () => void;
}

const PostItem: React.FC<PostItemProps> = ({
  postData,
  onLikePressed,
  onUnlikePressed,
  onCommentPressed,
}) => {
  return (
    <View style={styles.container}>
      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.username}>
          {postData.applicationUser?.userName || 'Anonymous'}
        </Text>
        <Text style={styles.createdAt}>
          {new Date(postData.createdAt).toLocaleDateString()}
        </Text>
      </View>

      {/* Content */}
      <Text style={styles.content}>{postData.content}</Text>

      {/* Images */}
      {postData.imageUrls.length > 0 && (
        <View style={styles.imageContainer}>
          {postData.imageUrls.map((url, index) => (
            <Image key={index} source={{ uri: url }} style={styles.image} />
          ))}
        </View>
      )}

      {/* Hashtags */}
      <View style={styles.hashtags}>
        {postData.hashtags.map((hashtag, index) => (
          <Text key={index} style={styles.hashtag}>
            #{hashtag}
          </Text>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={onLikePressed} style={styles.actionButton}>
          <Text style={styles.actionText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onUnlikePressed} style={styles.actionButton}>
          <Text style={styles.actionText}>Unlike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCommentPressed}
          style={styles.actionButton}
        >
          <Text style={styles.actionText}>Comment</Text>
        </TouchableOpacity>
        <Text style={styles.likes}>Likes: {postData.likes}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  createdAt: {
    color: '#666',
    fontSize: 12,
  },
  content: {
    fontSize: 14,
    marginBottom: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 8,
    borderRadius: 8,
  },
  hashtags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  hashtag: {
    color: '#007BFF',
    marginRight: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 8,
  },
  actionText: {
    color: '#007BFF',
  },
  likes: {
    marginLeft: 'auto',
    color: '#666',
    fontSize: 12,
  },
});

export default PostItem;

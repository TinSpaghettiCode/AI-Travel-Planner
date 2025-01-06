import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ImageViewer from 'react-native-image-viewing';
import { ActivityIndicator } from 'react-native';

interface Post {
  hashtags: string[];
  createdAt: Date;
  content: string;
  imageUrls: string[];
  likes: number;
  userName: string;
  comments: string[];
}

interface PostItemProps {
  postData: Post;
  onLikePressed: () => void;
  onUnlikePressed: () => void;
}

const PostItem: React.FC<PostItemProps> = ({
  postData,
  onLikePressed,
  onUnlikePressed,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [randomAvatarUrl, setRandomAvatarUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Random avatar URL
    setRandomAvatarUrl(
      `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}`
    );
  }, []);

  const toggleLike = () => {
    if (isLiked) {
      onUnlikePressed();
    } else {
      onLikePressed();
    }
    setIsLiked(!isLiked);
  };

  const navigateToComments = () => {
    router.push({
      pathname: '/forum/comment-page',
      params: { params: JSON.stringify(postData) },
    });
  };

  const handleImagePress = (index: number) => {
    setCurrentImageIndex(index);
    setIsViewerVisible(true);
  };

  const closeImageViewer = () => {
    setIsViewerVisible(false);
  };

  const renderImageLayout = () => {
    const imageCount = postData.imageUrls.length;

    if (imageCount === 1) {
      const imageUrl = postData.imageUrls[0];
      return (
        <View style={styles.fullImageContainer}>
          <TouchableOpacity onPress={() => handleImagePress(0)}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.firstImage}
              onError={(e) => console.log('Image error', e.nativeEvent.error)}
            />
          </TouchableOpacity>
        </View>
      );
    }

    if (imageCount === 2) {
      return (
        <View style={styles.twoImagesContainer}>
          {postData.imageUrls.map((url, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImagePress(index)}
              style={styles.twoImageWrapper}
            >
              <Image source={{ uri: url }} style={styles.otherImage} />
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    if (imageCount >= 3) {
      return (
        <View style={styles.threeImagesContainer}>
          <TouchableOpacity
            onPress={() => handleImagePress(0)}
            style={styles.firstImageWrapper}
          >
            <Image
              source={{ uri: postData.imageUrls[0] }}
              style={styles.firstImage}
            />
          </TouchableOpacity>
          <View style={styles.otherImagesWrapper}>
            {postData.imageUrls.slice(1, 3).map((url, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleImagePress(index + 1)}
                style={styles.otherImageWrapper}
              >
                <Image source={{ uri: url }} style={styles.otherImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* User Info */}

      <View style={styles.userInfo}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {randomAvatarUrl ? (
            <Image source={{ uri: randomAvatarUrl }} style={styles.avatar} />
          ) : (
            <ActivityIndicator
              size="small"
              color="#7fbbf0"
              style={styles.avatar}
            />
          )}
          <Text style={styles.username}>
            {postData.userName ? postData.userName : 'Anonymous'}
          </Text>
        </View>

        <Text style={styles.createdAt}>
          {new Date(postData.createdAt).toLocaleDateString()}
        </Text>
      </View>

      {/* Content */}
      <Text style={styles.content}>{postData.content}</Text>

      {/* Images */}
      {postData.imageUrls.length > 0 && renderImageLayout()}

      {/* Hashtags */}
      <View style={styles.hashtagsContainer}>
        {postData.hashtags.map((hashtag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.hashtag}>#{hashtag}</Text>
          </View>
        ))}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color="red"
          />
          <Text style={styles.likes}>{postData.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={navigateToComments}
          style={styles.commentButton}
        >
          <Ionicons name="chatbubble-outline" size={24} />
          <Text style={styles.likes}>{postData.comments.length}</Text>
        </TouchableOpacity>
      </View>

      {/* Image Viewer for Full-Screen View */}
      <ImageViewer
        images={postData.imageUrls.map((url) => ({ uri: url }))}
        imageIndex={currentImageIndex}
        visible={isViewerVisible}
        onRequestClose={closeImageViewer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 30,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 5,
    marginRight: 16,
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
    marginVertical: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  fullImageContainer: {
    width: '100%',
    marginBottom: 8,
  },
  twoImagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  twoImageWrapper: {
    width: '48%',
  },
  threeImagesContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  firstImageWrapper: {
    width: '60%',
  },
  otherImagesWrapper: {
    width: '40%',
    flexDirection: 'column',
  },
  otherImageWrapper: {
    width: '100%',
    marginBottom: 8,
  },
  firstImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginRight: 8,
  },
  otherImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginLeft: 8,
  },
  hashtagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#E0F7FF',
    padding: 4,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4,
  },
  hashtag: {
    color: '#007BFF',
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  likes: {
    marginLeft: 8,
    color: '#666',
    fontSize: 16,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PostItem;

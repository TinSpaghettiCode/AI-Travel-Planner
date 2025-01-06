import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from './../../configs/SupabaseConfig';
import * as FileSystem from 'expo-file-system';
import { auth, db } from '@/configs/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { decode } from 'base64-arraybuffer';
import { Ionicons } from '@expo/vector-icons';

const HashtagInput = ({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [text, setText] = useState('');

  const addTag = () => {
    if (text.trim() !== '' && !tags.includes(text.trim())) {
      setTags([...tags, text.trim()]);
      setText('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <View style={styles.tagInputContainer}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter a hashtag..."
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
        onSubmitEditing={addTag} // Add tag on pressing 'Enter'
      />
      <View style={styles.tagList}>
        {tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
            <TouchableOpacity onPress={() => removeTag(tag)}>
              <Text style={styles.removeTagText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const CreatePostScreen = () => {
  const user = auth.currentUser;
  const { params } = useLocalSearchParams();
  let channel = null;

  try {
    channel = JSON.parse(typeof params === 'string' ? params : '{}');
    console.log('Channel:', channel);
  } catch (e) {
    console.error('Error parsing channel:', e);
  }
  const [postContent, setPostContent] = useState('');
  const [pickedImages, setPickedImages] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const router = useRouter();

  const pickImages = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets) {
        const images = result.assets;
        setPickedImages([...pickedImages, ...images.map((image) => image.uri)]);
      }
    } catch (e) {
      console.error('Error picking images:', e);
    }
  };

  const uploadImageToSupabase = async (uri: string) => {
    try {
      const base64Data = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const fileName = uri.split('/').pop();
      const filePath = `public/${fileName}`;

      const { data, error } = await supabase.storage
        .from('travel-planner')
        .upload(filePath, decode(base64Data), {
          contentType: 'image/jpeg',
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error', 'Failed to upload images.');
        return null;
      }

      const { data: imageData } = supabase.storage
        .from('travel-planner')
        .getPublicUrl(`public/${fileName}`);

      return imageData.publicUrl;
    } catch (e) {
      console.error('Error uploading image:', e);
      Alert.alert('Error', 'Failed to upload images.');
      return null;
    }
  };

  const removeImage = (uri: string) => {
    setPickedImages((prev) => prev.filter((image) => image !== uri));
  };

  const createPost = async () => {
    if (!postContent.trim() || hashtags.length === 0) {
      Alert.alert(
        'Error',
        'Please enter post content and at least one hashtag.'
      );
      return;
    }

    let imageUrls: string[] = [];

    for (const image of pickedImages) {
      const imageUrl = await uploadImageToSupabase(image);
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    }

    const postData = {
      content: postContent,
      hashtags,
      imageUrls: imageUrls,
      createdAt: new Date(),
      likes: 0,
      comments: [],
      userName: user?.email || 'Anonymous',
      channelId: channel.id,
    };

    console.log('Post Data:', postData);

    // Save post data to your database
    try {
      const docRef = await addDoc(collection(db, 'Posts'), postData);
      console.log('Posts created with ID: ', docRef.id);
      Alert.alert('Success', 'Posts created successfully!');
      router.back();
    } catch (error) {
      console.error('Error creating Posts: ', error);
      Alert.alert(
        'Error',
        'There was an issue creating the Posts. Please try again.'
      );
    }
  };

  const showConfirmationDialog = () => {
    Alert.alert('Confirmation', 'Are you sure you want to create this post?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: createPost },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.actionBarTitle}>Post Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.label}>Enter hashtags for your post</Text>
        <HashtagInput tags={hashtags} setTags={setHashtags} />

        <Text style={styles.label}>Post Content</Text>
        <TextInput
          style={styles.textInput}
          value={postContent}
          onChangeText={setPostContent}
          placeholder="Write your post content here..."
          placeholderTextColor="#999"
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={pickImages}>
          <Text style={styles.buttonText}>Add Images</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {pickedImages.map((uri) => (
            <View key={uri} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeImage(uri)}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() =>
              Alert.alert('Cancelled', 'You cancelled creating the post.')
            }
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={showConfirmationDialog}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    paddingVertical: 12,
    backgroundColor: '#7fbbf0',
    color: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    color: '#333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: '#7fbbf0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: 'gray',
    marginRight: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#B00020',
    borderRadius: 12,
    padding: 4,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tagInputContainer: {
    marginBottom: 16,
  },
  tagList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tagText: {
    color: '#333',
    fontWeight: 'bold',
  },
  removeTagText: {
    color: '#B00020',
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7fbbf0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
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

export default CreatePostScreen;

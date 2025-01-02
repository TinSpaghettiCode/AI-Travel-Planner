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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from './../../configs/SupabaseConfig';

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
  const [postContent, setPostContent] = useState('');
  const [pickedImages, setPickedImages] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

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
      const response = await fetch(uri);
      const blob = await response.blob();
      const fileName = uri.split('/').pop();

      const { data, error } = await supabase.storage
        .from('travel-planner') // Replace with your bucket name
        .upload(`public/${fileName}`, blob, {
          contentType: 'image/jpeg',
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

  const createPost = () => {
    if (!postContent.trim() || hashtags.length === 0) {
      Alert.alert(
        'Error',
        'Please enter post content and at least one hashtag.'
      );
      return;
    }

    const postData = {
      content: postContent,
      hashtags,
      imageUrls: pickedImages,
    };

    console.log('Post Data:', postData);
    Alert.alert('Success', 'Your post has been created!');
  };

  const showConfirmationDialog = () => {
    Alert.alert('Confirmation', 'Are you sure you want to create this post?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: createPost },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  label: {
    color: '#333',
    fontSize: 16,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    color: '#333',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#6200EE',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  cancelButton: {
    backgroundColor: '#B00020',
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
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'red',
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
  tagText: {
    color: '#333',
  },
  removeTagText: {
    color: '#B00020',
    marginLeft: 4,
    fontWeight: 'bold',
  },
});

export default CreatePostScreen;

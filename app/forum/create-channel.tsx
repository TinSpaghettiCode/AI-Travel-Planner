import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { db } from '@/configs/FirebaseConfig'; // Make sure Firebase config is imported
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const CreateChannelScreen = () => {
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const router = useRouter();

  const createChannel = async () => {
    const channelData = {
      name: channelName,
      description: channelDescription,
      createdAt: new Date(), // You can add other metadata if needed
    };

    try {
      const docRef = await addDoc(collection(db, 'Channels'), channelData);
      console.log('Channel created with ID: ', docRef.id);
      Alert.alert('Success', 'Channel created successfully!');
      router.back();
    } catch (error) {
      console.error('Error creating channel: ', error);
      Alert.alert(
        'Error',
        'There was an issue creating the channel. Please try again.'
      );
    }
  };

  const showConfirmationDialog = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to create this channel?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => createChannel(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.label}>Channel Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., #violet_evergarden"
          placeholderTextColor="#ACACAC"
          value={channelName}
          onChangeText={setChannelName}
        />

        <Text style={styles.label}>Channel Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter channel description"
          placeholderTextColor="#ACACAC"
          value={channelDescription}
          onChangeText={setChannelDescription}
          multiline
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() =>
              Alert.alert('Cancelled', 'Channel creation cancelled.')
            }
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => {
              if (channelName.trim() && channelDescription.trim()) {
                showConfirmationDialog();
              } else {
                Alert.alert('Error', 'Please fill out all fields.');
              }
            }}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#333333',
    color: 'white',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#555555',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 8,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreateChannelScreen;

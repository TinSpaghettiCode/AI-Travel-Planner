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
import { Ionicons } from '@expo/vector-icons';

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
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.actionBarTitle}>Channel Details</Text>
      </View>
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
    paddingVertical: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#7fbbf0',
    marginBottom: 16,
    paddingVertical: 10,
    textAlign: 'left',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    color: 'black',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    backgroundColor: '#d1d1d1',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#0066cc',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
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

export default CreateChannelScreen;

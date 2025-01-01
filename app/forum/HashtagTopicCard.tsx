import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // You can use MaterialIcons or another icon library

interface HashtagTopicCardProps {
  hashtag: string;
  description: string;
  onCreatePost: () => void;
}

const HashtagTopicCard: React.FC<HashtagTopicCardProps> = ({
  hashtag,
  description,
  onCreatePost,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hashtagText}>#{hashtag}</Text>
        <TouchableOpacity onPress={onCreatePost} style={styles.button}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Tạo bài đăng</Text>
            <MaterialCommunityIcons name="plus" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hashtagText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 24,
    backgroundColor: '#6200ea', // You can change the button color
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginRight: 8,
  },
  description: {
    marginTop: 8,
    color: 'gray',
  },
});

export default HashtagTopicCard;

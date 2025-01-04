import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // You can use MaterialIcons or another icon library

interface HashtagTopicCardProps {
  hashtag: string;
  description: string;
  isSubscribed: boolean;
  onCreatePost: () => void;
  onToggleSubscription: () => void;
}

const HashtagTopicCard: React.FC<HashtagTopicCardProps> = ({
  hashtag,
  description,
  isSubscribed,
  onCreatePost,
  onToggleSubscription,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            flex: 1, // Ensures the sections take up equal space
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            <Text style={styles.hashtagText}>#{hashtag}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              style={[
                styles.subscriptionButton,
                isSubscribed
                  ? styles.unsubscribeButton
                  : styles.subscribeButton,
              ]}
              onPress={onToggleSubscription}
            >
              <Text style={styles.subscriptionButtonText}>
                {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCreatePost} style={styles.button}>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Create Post</Text>
                <MaterialCommunityIcons name="plus" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    elevation: 5,
    borderWidth: 1,
    marginVertical: 6,
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
    backgroundColor: '#7fbbf0',
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
  subscriptionButton: {
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  subscribeButton: {
    backgroundColor: 'blue',
  },
  unsubscribeButton: {
    backgroundColor: 'gray',
  },
  subscriptionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HashtagTopicCard;

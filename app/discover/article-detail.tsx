import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export type Location = {
  id: number;
  title: string;
  location: string;
  category: string;
  rating: number;
  description: string;
  imageUrls: string[];
  createdAt: string;
  author: string;
};

const { width: screenWidth } = Dimensions.get('window'); // Get screen width

const renderRatingStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <View style={styles.ratingContainer}>
      {[...Array(fullStars)].map((_, index) => (
        <Text key={`full-${index}`} style={styles.star}>
          ★
        </Text>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <Text key={`empty-${index}`} style={styles.emptyStar}>
          ★
        </Text>
      ))}
    </View>
  );
};

const ArticleDetail = () => {
  const { params } = useLocalSearchParams();
  const [location, setLocation] = useState<Location | null>(null);
  const [user, setUser] = useState<any>(null);
  const [randomAvatarUrl, setRandomAvatarUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter(); // Router for navigation

  useEffect(() => {
    if (params) {
      try {
        const parsedLocation = JSON.parse(
          typeof params === 'string' ? params : '{}'
        );
        setLocation(parsedLocation);
      } catch (error) {
        console.error('Error parsing location:', error);
      }
    }

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setRandomAvatarUrl(
          `https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100) + 1}`
        );
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [params]);

  if (!location || isLoading) {
    return (
      <ActivityIndicator size="large" color="#7fbbf0" style={styles.loading} />
    );
  }

  // Carousel data
  const carouselData = location.imageUrls;

  return (
    <View style={styles.container}>
      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.actionBarTitle}>Post Details</Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        {/* Manual Image Carousel */}
        <FlatList
          horizontal
          data={carouselData}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.carouselImage} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled // Enables snapping to each image
        />
        <Text style={styles.articleTitle}>{location.title}</Text>
        <Text style={styles.articleCategory}>{location.category}</Text>
        <Text style={styles.articleLocation}>{location.location}</Text>
        <Text style={styles.articleDescription}>{location.description}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.articleRating}>Rating:</Text>
          {renderRatingStars(location.rating)}
        </View>

        <View style={styles.authorContainer}>
          {randomAvatarUrl ? (
            <Image source={{ uri: randomAvatarUrl }} style={styles.avatar} />
          ) : (
            <ActivityIndicator
              size="small"
              color="#7fbbf0"
              style={styles.avatar}
            />
          )}
          <Text style={styles.authorText}>By {location.author}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 30,
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  articleImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  articleTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10,
  },
  articleCategory: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  articleLocation: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  articleRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f5a623',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  star: {
    fontSize: 20,
    color: '#f5a623',
  },
  emptyStar: {
    fontSize: 20,
    color: '#dcdcdc',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  carouselImage: {
    width: screenWidth, // Width of the screen
    height: 250, // Adjust the size of images in the carousel
    borderRadius: 10,
    marginRight: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ArticleDetail;

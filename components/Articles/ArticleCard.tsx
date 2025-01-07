import { router } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Location } from '../../constants/Locations';

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

const ArticleCard = ({ location }: { location: Location }) => {
  return (
    <TouchableOpacity
      style={styles.articleCard}
      onPress={() =>
        router.push({
          pathname: '/discover/article-detail',
          params: { params: JSON.stringify(location) },
        })
      }
    >
      <Image
        source={{ uri: location.imageUrls[0] }}
        style={styles.articleImage}
      />
      <View style={styles.articleContent}>
        <Text style={styles.articleCategory}>{location.category}</Text>
        <Text style={styles.articleTitle}>{location.title}</Text>
        <Text style={styles.articleLocation}>{location.location}</Text>
        <Text style={styles.articleDescription} numberOfLines={3}>
          {location.description}
        </Text>
        <View style={styles.rating}>{renderRatingStars(location.rating)}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  articleCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  articleImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  articleContent: {
    flex: 1,
  },
  articleCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 4,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  articleLocation: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  articleDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: '#f5a623',
  },
  emptyStar: {
    fontSize: 16,
    color: '#dcdcdc',
  },
});

export default ArticleCard;

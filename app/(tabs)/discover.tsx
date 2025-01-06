import React from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function Discover() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover</Text>
      <TravelGuideScreen />
    </View>
  );
}

const TravelGuideScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Guide Header */}
      <Text style={styles.header}>Guide</Text>

      {/* "Might Need These" Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Might Need These</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}
        >
          <View style={styles.card}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Budget Travel</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>First-time Abroad</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Safe Travel</Text>
          </View>
        </ScrollView>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="A country, a city, a place... or anything"
        />
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Sightseeing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Resort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryButton}>
          <Text style={styles.categoryText}>Restaurant</Text>
        </TouchableOpacity>
      </View>

      {/* Top-Pick Articles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top-Pick Articles</Text>
        <View style={styles.articleCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.articleImage}
          />
          <View>
            <Text style={styles.articleType}>EXPERIENCE</Text>
            <Text style={styles.articleTitle}>
              Beautiful Alley Scene in Old Town in Europe at Sunset
            </Text>
          </View>
        </View>
        <View style={styles.articleCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.articleImage}
          />
          <View>
            <Text style={styles.articleType}>SHOPPING</Text>
            <Text style={styles.articleTitle}>
              The Ultimate Shopping Guide for Trendy Items
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  seeAll: {
    color: '#007bff',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
  },
  card: {
    marginRight: 16,
    alignItems: 'center',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  searchBarContainer: {
    marginVertical: 16,
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  articleImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 16,
  },
  articleType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#888',
    marginBottom: 4,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
});

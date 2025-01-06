import ArticleCard from '@/components/Articles/ArticleCard';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useRef, useState, useEffect } from 'react';
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
      <TravelGuideScreen />
    </View>
  );
}

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

const mockLocations: Location[] = [
  {
    id: 1,
    title: 'Eiffel Tower Review: A Must-See Attraction',
    location: 'Paris, France',
    category: 'Sightseeing',
    rating: 4.8,
    description:
      'Experience the breathtaking views from the top of the Eiffel Tower. This iconic landmark is a must-see for travelers visiting Paris. Enjoy the romantic atmosphere and explore nearby cafes. Enjoy the romantic atmosphere and explore nearby cafes.Enjoy the romantic atmosphere and explore nearby cafes.Enjoy the romantic atmosphere and explore nearby cafes.',
    imageUrls: [
      'https://htganmgiwwqyswitxwtl.supabase.co/storage/v1/object/public/travel-planner/eiffel-1.jpg?t=2025-01-06T19%3A10%3A30.190Z',
      'https://htganmgiwwqyswitxwtl.supabase.co/storage/v1/object/public/travel-planner/eiffel-2.jpg?t=2025-01-06T19%3A10%3A43.019Z',
      'https://htganmgiwwqyswitxwtl.supabase.co/storage/v1/object/public/travel-planner/effiel-3.jpg?t=2025-01-06T19%3A10%3A52.462Z',
    ],
    createdAt: '2024-01-01T10:00:00Z', // Added createdAt
    author: 'John Doe', // Added author
  },
  {
    id: 2,
    title: 'Santorini Beaches',
    location: 'Santorini, Greece',
    category: 'Resort',
    rating: 4.6,
    description:
      'Relax on the stunning beaches of Santorini, known for their unique black and red sand. Enjoy the crystal-clear waters and the picturesque sunsets that make this a dream destination.',
    imageUrls: [
      'https://htganmgiwwqyswitxwtl.supabase.co/storage/v1/object/public/travel-planner/santorini.jpg?t=2025-01-06T19%3A16%3A44.594Z',
    ],
    createdAt: '2024-01-02T10:00:00Z', // Added createdAt
    author: 'Jane Smith', // Added author
  },
  {
    id: 3,
    title: 'Shibuya Sushi',
    location: 'Tokyo, Japan',
    category: 'Restaurant',
    rating: 4.5,
    description:
      'Indulge in authentic Japanese sushi at Shibuya Sushi. Famous for its fresh ingredients and artistic presentation, this restaurant offers an unforgettable culinary experience in Tokyo.',
    imageUrls: [
      'https://htganmgiwwqyswitxwtl.supabase.co/storage/v1/object/public/travel-planner/shibuya.jpg?t=2025-01-06T19%3A16%3A53.116Z',
    ],
    createdAt: '2024-01-03T10:00:00Z', // Added createdAt
    author: 'Taro Yamada', // Added author
  },
  {
    id: 4,
    title: 'Central Park',
    location: 'New York City, USA',
    category: 'Sightseeing',
    rating: 4.7,
    description:
      'Explore the iconic Central Park in the heart of New York City. From scenic walking paths to boat rides on the lake, this urban oasis offers something for everyone.',
    imageUrls: [
      'https://htganmgiwwqyswitxwtl.supabase.co/storage/v1/object/public/travel-planner/central-park-air.jpg?t=2025-01-06T19%3A16%3A59.853Z',
    ],
    createdAt: '2024-01-04T10:00:00Z', // Added createdAt
    author: 'Alice Johnson', // Added author
  },
  {
    id: 5,
    title: 'Luxurious Maldives Resort',
    location: 'Maldives',
    category: 'Resort',
    rating: 4.9,
    description:
      'Stay at a luxurious overwater resort in the Maldives. Enjoy world-class amenities, pristine beaches, and unparalleled views of the turquoise ocean.',
    imageUrls: [
      'https://htganmgiwwqyswitxwtl.supabase.co/storage/v1/object/public/travel-planner/maldive.jpg?t=2025-01-06T19%3A17%3A07.404Z',
    ],
    createdAt: '2024-01-05T10:00:00Z', // Added createdAt
    author: 'Mohamed Ali', // Added author
  },
  {
    id: 6,
    title: 'Le Gourmet',
    location: 'Paris, France',
    category: 'Restaurant',
    rating: 4.8,
    description:
      'Savor exquisite French cuisine at Le Gourmet. Known for its elegant atmosphere and delicious dishes, this restaurant is a favorite among food enthusiasts visiting Paris.',
    imageUrls: [
      'https://htganmgiwwqyswitxwtl.supabase.co/storage/v1/object/public/travel-planner/effiel-3.jpg?t=2025-01-06T19%3A10%3A52.462Z',
    ],
    createdAt: '2024-01-06T10:00:00Z', // Added createdAt
    author: 'Claude Dupont', // Added author
  },
];

const fetchLocations = (
  category: string | null = null
): Promise<Location[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (category) {
        resolve(
          mockLocations.filter((location) => location.category === category)
        );
      } else {
        resolve(mockLocations);
      }
    }, 1000);
  });
};

const TravelGuideScreen = () => {
  const [locations, setLocations] = useState(mockLocations); // Using updated mock data
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter locations based on category and search query
  const filteredLocations = locations.filter((location) => {
    const matchesCategory = selectedCategory
      ? location.category === selectedCategory
      : true;
    const matchesSearchQuery =
      location.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearchQuery;
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={{ width: 52, height: 52 }}
        />
        <Text style={styles.headerText}>Discover</Text>
        <TouchableOpacity onPress={() => router.push('/forum/create-channel')}>
          <Ionicons name="add-circle" size={50} color="black" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.section}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.sectionTitle}>Might Need These</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsContainer}
        >
          <View style={styles.card}>
            <Image
              source={require('./../../assets/images/savings-money.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Budget Travel</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require('./../../assets/images/airplane-schedule.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>First-time Abroad</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require('./../../assets/images/safe-travel.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Safe Travel</Text>
          </View>
          <View style={styles.card}>
            <Image
              source={require('./../../assets/images/airplane-schedule.jpg')}
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>New Experiences</Text>
          </View>
        </ScrollView>
      </View>

      {/* Categories */}
      <View style={styles.categories}>
        {['Sightseeing', 'Resort', 'Restaurant'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() =>
              setSelectedCategory(
                selectedCategory === category ? null : category
              )
            }
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Article Cards */}
      <View style={styles.articlesContainer}>
        {filteredLocations.map((location) => (
          <ArticleCard key={location.id} location={location} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    padding: 16,
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
    color: '#7fbbf0',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  cardsContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  card: {
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  headerText: {
    fontFamily: 'roboto-bold',
    fontSize: 33,
  },
  searchContainer: {
    marginVertical: 16,
    marginHorizontal: 8,
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
    fontSize: 16,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  selectedCategoryButton: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  articlesContainer: {
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
});

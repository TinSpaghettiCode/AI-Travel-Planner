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

export const mockLocations: Location[] = [
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
    createdAt: '2024-01-01T10:00:00Z',
    author: 'John Doe',
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

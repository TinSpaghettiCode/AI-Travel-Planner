// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_REACT_APP_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_REACT_APP_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_REACT_APP_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_REACT_APP_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { app, auth, db };

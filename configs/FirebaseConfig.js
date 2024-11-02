// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZCk3XX2cISlsQATwpU3jhr7qvOlBqgs0",
  authDomain: "gotiq-775ff.firebaseapp.com",
  projectId: "gotiq-775ff",
  storageBucket: "gotiq-775ff.appspot.com",
  messagingSenderId: "534477790532",
  appId: "1:534477790532:web:6d48148cbafbb5d61b0b11",
  measurementId: "G-20QEQZVW98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// initialize Firebase Auth for that app immediately
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, auth };

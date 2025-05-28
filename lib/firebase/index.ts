import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence, indexedDBLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAlfNQgmdOiO6xlu6mwSt8d2U75HYY6Hs",
  authDomain: "stamply-1a6fd.firebaseapp.com",
  projectId: "stamply-1a6fd",
  storageBucket: "stamply-1a6fd.firebasestorage.app",
  messagingSenderId: "544643831132",
  appId: "1:544643831132:web:967c2cfc487e47ce8a5d99",
  measurementId: "G-KZ58VE21YP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Set persistence based on platform
if (Platform.OS === 'web') {
  // For web, use browser persistence
  setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
      console.error('Error setting auth persistence:', error);
    });
} else {
  // For mobile, AsyncStorage persistence is handled differently
  // The persistence is handled internally by Firebase
}

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

export { auth, db, storage }; 
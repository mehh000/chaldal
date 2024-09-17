// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyAAQaKIGK0L9cj1a-9tFimgr4JxzoF7jfc",
  authDomain: "chaldal-1078d.firebaseapp.com",
  projectId: "chaldal-1078d",
  storageBucket: "chaldal-1078d.appspot.com",
  messagingSenderId: "765006783881",
  appId: "1:765006783881:web:1b78884a63fe0c03b6ad58",
  measurementId: "G-N7Z4MRZ593"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app); // Firestore initialization

export { auth, db,storage };
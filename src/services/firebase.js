
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const {
VITE_FIREBASE_KEY,
VITE_DOMAIN,
VITE_PROJECTID,
VITE_STORAGEBUCKET,
VITE_MESSAGING,
VITE_APPID
} = import.meta.env

const firebaseConfig = {
  apiKey: VITE_FIREBASE_KEY,
  authDomain: VITE_DOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGING,
  appId: VITE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
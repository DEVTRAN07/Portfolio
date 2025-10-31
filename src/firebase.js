// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDq0i-X7sj4gDsvRJbo9Xp_zFGVfwF2hEk",
  authDomain: "ntmdz-prf-tdq.firebaseapp.com",
  projectId: "ntmdz-prf-tdq",
  storageBucket: "ntmdz-prf-tdq.firebasestorage.app",
  messagingSenderId: "1080403217155",
  appId: "1:1080403217155:web:f28a2f2966664b097fb736",
  measurementId: "G-KV7PGYJ3VZ"
};

// Init Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const loginWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);

// Firestore
export const db = getFirestore(app);

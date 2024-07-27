// src/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYHaXhHOxM5oD9jBwuSNJpHZxdQQXYOrE",
  authDomain: "chatter-35cfe.firebaseapp.com",
  projectId: "chatter-35cfe",
  storageBucket: "chatter-35cfe.appspot.com",
  messagingSenderId: "361733664573",
  appId: "1:361733664573:web:ec4fd09eaeec4cae0d9f54",
  measurementId: "G-KRCTJ02WWM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, googleProvider, facebookProvider, db, storage };

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBD4_0h4g-2V7XeMUCzZazfgAtYkMUDYw8",
  authDomain: "anzensensei.firebaseapp.com",
  projectId: "anzensensei",
  storageBucket: "anzensensei.firebasestorage.app",
  messagingSenderId: "315612728179",
  appId: "1:315612728179:web:28570e3e87a3272b849306",
};

const app = initializeApp(firebaseConfig);

// SIMPLE AUTH (works on both web + mobile)
export const auth = getAuth(app);
export const db = getFirestore(app);

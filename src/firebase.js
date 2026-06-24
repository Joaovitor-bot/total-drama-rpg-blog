import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBVyrqLJ6bHbQNG9Z6Ujoi5GewLK4SZMQ",
  authDomain: "total-drama-rpg-blog.firebaseapp.com",
  projectId: "total-drama-rpg-blog",
  storageBucket: "total-drama-rpg-blog.firebasestorage.app",
  messagingSenderId: "979779951140",
  appId: "1:979779951140:web:102a0c25751a3c46e616b1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
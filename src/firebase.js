import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDqkm6ZLM18sm8MDGzL7Y5GZQYqPx6QH7Q",
  authDomain: "tiendaev-3f0e1.firebaseapp.com",
  projectId: "tiendaev-3f0e1",
  storageBucket: "tiendaev-3f0e1.firebasestorage.app",
  messagingSenderId: "926041532140",
  appId: "1:926041532140:web:19ab866d94ead7b0c227c9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
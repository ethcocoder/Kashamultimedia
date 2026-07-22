import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCywV_tTRF5e8_gs3-Ms6g9tBk0tR8NQgo",
  authDomain: "wereda4-barber.firebaseapp.com",
  projectId: "wereda4-barber",
  storageBucket: "wereda4-barber.firebasestorage.app",
  messagingSenderId: "895243970357",
  appId: "1:895243970357:web:4c6e86145db6ca37e14e7c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

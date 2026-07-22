import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAP77EKvO3_X-DJrQ7yV_XyQG62yGx7Tq0",
  authDomain: "kashamultimedia.firebaseapp.com",
  projectId: "kashamultimedia",
  storageBucket: "kashamultimedia.firebasestorage.app",
  messagingSenderId: "19513916917",
  appId: "1:19513916917:web:bf71ac4c5cf36491d834bc",
  measurementId: "G-R634MM4CQV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;

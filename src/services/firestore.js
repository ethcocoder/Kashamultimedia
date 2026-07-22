import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const collections = {
  services: 'services',
  gallery: 'gallery',
  blog: 'blog',
  testimonials: 'testimonials',
  settings: 'settings',
  bookings: 'bookings',
};

export async function getAll(collectionName, constraints = []) {
  const q = constraints.length
    ? query(collection(db, collections[collectionName]), ...constraints)
    : collection(db, collections[collectionName]);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getById(collectionName, id) {
  const snap = await getDoc(doc(db, collections[collectionName], id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function create(collectionName, data) {
  const docRef = await addDoc(collection(db, collections[collectionName]), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function update(collectionName, id, data) {
  await updateDoc(doc(db, collections[collectionName], id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function remove(collectionName, id) {
  await deleteDoc(doc(db, collections[collectionName], id));
}

export async function getLatest(collectionName, count = 5) {
  return getAll(collectionName, [orderBy('createdAt', 'desc'), limit(count)]);
}

export async function getPublished(collectionName) {
  return getAll(collectionName, [where('status', '==', 'published')]);
}

export async function getBookingsByDate(dateStr) {
  const q = query(collection(db, 'bookings'), where('date', '==', dateStr));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function checkSlotAvailability(dateStr, timeSlot) {
  const bookings = await getBookingsByDate(dateStr);
  const taken = bookings.some((b) => b.time === timeSlot && b.status !== 'cancelled');
  return !taken;
}

export async function createBooking(data, imageDataUrl) {
  const docRef = await addDoc(collection(db, 'bookings'), {
    ...data,
    confirmationImage: imageDataUrl || null,
    status: 'confirmed',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

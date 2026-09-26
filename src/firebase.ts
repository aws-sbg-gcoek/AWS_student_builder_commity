import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId: string;
}

const CONFIG_STORAGE_KEY = 'user_firebase_config';

// 1. Get configuration either from localStorage or Vite .env
export function getActiveFirebaseConfig(): FirebaseConfig | null {
  // Check localStorage first (user-entered via UI)
  const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse stored Firebase config:', e);
    }
  }

  // Fallback to Vite environment variables if configured
  const env = (import.meta as any).env;
  if (env?.VITE_FIREBASE_API_KEY && env?.VITE_FIREBASE_PROJECT_ID) {
    return {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || `${env.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || `${env.VITE_FIREBASE_PROJECT_ID}.appspot.com`,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
      appId: env.VITE_FIREBASE_APP_ID || '',
    };
  }

  // Default Project Configuration (khatta-book-pro-app)
  return {
    apiKey: 'AIzaSyAn361Z4ukMGSlUFt5c93fOo9DW0licXJw',
    authDomain: 'khatta-book-pro-app.firebaseapp.com',
    projectId: 'khatta-book-pro-app',
    storageBucket: 'khatta-book-pro-app.firebasestorage.app',
    messagingSenderId: '155434004908',
    appId: '1:155434004908:android:2c0777d21411a696bf4a09',
  };
}

// 2. Save custom Firebase config from UI settings
export function saveFirebaseConfig(config: FirebaseConfig): boolean {
  try {
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (e) {
    console.error('Failed to save Firebase config:', e);
    return false;
  }
}

// 3. Clear Firebase config
export function clearFirebaseConfig() {
  localStorage.removeItem(CONFIG_STORAGE_KEY);
}

// Initialize instances safely
let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;

export function initializeFirebase(): { app: FirebaseApp | null; db: Firestore | null; auth: Auth | null } {
  const config = getActiveFirebaseConfig();
  if (!config) {
    return { app: null, db: null, auth: null };
  }

  try {
    if (!getApps().length) {
      appInstance = initializeApp(config);
    } else {
      appInstance = getApp();
    }
    dbInstance = getFirestore(appInstance);
    authInstance = getAuth(appInstance);
    return { app: appInstance, db: dbInstance, auth: authInstance };
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return { app: null, db: null, auth: null };
  }
}

// Check if Firebase is active
export function isFirebaseConnected(): boolean {
  const config = getActiveFirebaseConfig();
  return Boolean(config && config.apiKey && config.projectId);
}

// ── Firestore Services for Customer Dues ──
export const COLLECTION_DUES = 'customer_dues';

// Real-time synchronization
export function subscribeToFirebaseDues(
  onUpdate: (dues: any[]) => void,
  onError?: (err: Error) => void
): () => void {
  const { db } = initializeFirebase();
  if (!db) {
    return () => {};
  }

  try {
    const duesQuery = query(collection(db, COLLECTION_DUES), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      duesQuery,
      (snapshot) => {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        onUpdate(items);
      },
      (error) => {
        console.error('Firestore snapshot listener error:', error);
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  } catch (e) {
    console.error('Error creating Firestore listener:', e);
    return () => {};
  }
}

// Save or Update Customer Due in Firestore
export async function syncDueToFirestore(record: any): Promise<boolean> {
  const { db } = initializeFirebase();
  if (!db) return false;

  try {
    const docRef = doc(db, COLLECTION_DUES, record.id);
    await setDoc(docRef, record, { merge: true });
    return true;
  } catch (error) {
    console.error('Error syncing due record to Firestore:', error);
    return false;
  }
}

// Update payment in Firestore
export async function updatePaymentInFirestore(id: string, newPaidAmount: number, newStatus: string): Promise<boolean> {
  const { db } = initializeFirebase();
  if (!db) return false;

  try {
    const docRef = doc(db, COLLECTION_DUES, id);
    await updateDoc(docRef, {
      paidAmount: newPaidAmount,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
    return true;
  } catch (error) {
    console.error('Error updating payment in Firestore:', error);
    return false;
  }
}

// Delete due record from Firestore
export async function deleteDueFromFirestore(id: string): Promise<boolean> {
  const { db } = initializeFirebase();
  if (!db) return false;

  try {
    const docRef = doc(db, COLLECTION_DUES, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting due record from Firestore:', error);
    return false;
  }
}

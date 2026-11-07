import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
// CRITICAL: Specifying firestoreDatabaseId is mandatory for multi-database configurations
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export default app;

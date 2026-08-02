import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
  auth = getAuth(app);
} catch (e) {
  console.warn('[Firebase] Không thể khởi tạo Firebase:', e);
  // Fallback stubs — sẽ gây ra lỗi nhẹ trong Wishes nhưng không crash cả app
  app = initializeApp({ projectId: 'placeholder', apiKey: 'placeholder', appId: 'placeholder' }, 'fallback');
  db = getFirestore(app);
  auth = getAuth(app);
}

export { db, auth };

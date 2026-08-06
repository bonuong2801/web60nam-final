import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getDatabase, type Database } from 'firebase/database';
import firebaseConfig from '../../firebase-applet-config.json';

let app: FirebaseApp;
let db: Database;
let auth: Auth;

try {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  auth = getAuth(app);
} catch (e) {
  console.warn('[Firebase] Không thể khởi tạo Firebase:', e);
  app = initializeApp({
    projectId: 'placeholder',
    apiKey: 'placeholder',
    appId: 'placeholder',
    databaseURL: 'https://placeholder-default-rtdb.firebaseio.com'
  }, 'fallback');
  db = getDatabase(app);
  auth = getAuth(app);
}

export { db, auth };

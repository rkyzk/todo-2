/* FirebaseConfig.js */

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APPAPI_KEY,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SOTRAGE_BUCKET,
  messagingSenderId: process.env.REACT_MESSAGING_SENDER_ID,
  apiId: process.env.REACT_API_ID,
  mesurementId: process.env.REACT_MESUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

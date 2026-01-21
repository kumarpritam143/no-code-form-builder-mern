import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAbF1XU0hpdkBHw52mcSil6y8xfYkyHgU",
  authDomain: "bm-info-2059c.firebaseapp.com",
  projectId: "bm-info-2059c",
  storageBucket: "bm-info-2059c.firebasestorage.app",
  messagingSenderId: "467399751585",
  appId: "1:467399751585:web:ac99dcec42fdaf52153de0",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

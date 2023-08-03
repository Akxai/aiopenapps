import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArCDMrmHn0ckHt9KyvViBWCXmZkTV5m_M",
  authDomain: "openapps-11d44.firebaseapp.com",
  projectId: "openapps-11d44",
  storageBucket: "openapps-11d44.appspot.com",
  messagingSenderId: "768648720553",
  appId: "1:768648720553:web:a1bc1ba74bccda428839b8",
  measurementId: "G-NPJQ7NTFQD",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { app, auth, provider, db };

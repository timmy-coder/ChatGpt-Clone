import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDQ1sBccbHbFbK1fjjalHW7gOA-0JCPhZI",
  authDomain: "chatgpt-clone-14dcc.firebaseapp.com",
  projectId: "chatgpt-clone-14dcc",
  storageBucket: "chatgpt-clone-14dcc.appspot.com",
  messagingSenderId: "863807845925",
  appId: "1:863807845925:web:7f4d685f7886873f2bb1cc",
  measurementId: "G-5WXMDVMHQ2"
};

// Initialize Firebase

const app = getApps().length ? getApp(): initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db };
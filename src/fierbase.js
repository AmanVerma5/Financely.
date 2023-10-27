// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getFirestore, doc ,setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8YPEflJUivsMgm0CpeMXxAttgClgtPTg",
  authDomain: "personal-finance-tracker-f81d9.firebaseapp.com",
  projectId: "personal-finance-tracker-f81d9",
  storageBucket: "personal-finance-tracker-f81d9.appspot.com",
  messagingSenderId: "1079006737693",
  appId: "1:1079006737693:web:ef40eb8d0fdfb08a2addf4",
  measurementId: "G-435M6JJPJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export {db, auth,provider,doc,setDoc};
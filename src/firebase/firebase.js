// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Add this import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHcnswIvOvEamllVmx3aAE-w_oeLr5Mkc",
  authDomain: "to-do-list-e0aef.firebaseapp.com",
  projectId: "to-do-list-e0aef",
  storageBucket: "to-do-list-e0aef.appspot.com",
  messagingSenderId: "113907357190",
  appId: "1:113907357190:web:19a57af3327ea8a6ea5587",
  measurementId: "G-Z01H0JGPSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

export { app, db }; // Export the Firestore instance along with the Firebase app

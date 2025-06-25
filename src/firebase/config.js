// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB-bzNycxslBtkoLvNP6X0TBNZ12Y3XgaM",
  authDomain: "book-list-with-firebase-f0c3f.firebaseapp.com",
  projectId: "book-list-with-firebase-f0c3f",
  storageBucket: "book-list-with-firebase-f0c3f.firebasestorage.app",
  messagingSenderId: "364934251485",
  appId: "1:364934251485:web:5606a0c9c992e01c4b2c34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
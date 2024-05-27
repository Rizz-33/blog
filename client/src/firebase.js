// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-web-app-30b0c.firebaseapp.com",
  projectId: "blog-web-app-30b0c",
  storageBucket: "blog-web-app-30b0c.appspot.com",
  messagingSenderId: "983233322317",
  appId: "1:983233322317:web:d66ff76a8112cbee0aeb04",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// // src/firebase/config.js
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyCRD-GRmhGUmtzGOSxBP0L0ObQKBC5Md2U",
//   authDomain: "social-media-686a8.firebaseapp.com",
//   projectId: "social-media-686a8",
//   storageBucket: "social-media-686a8.firebasestorage.app",
//   messagingSenderId: "853324556463",
//   appId: "1:853324556463:web:9910ebaa50a62cafb58c5a",
//   measurementId: "G-9Q0YYXHCY7",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export default app;

// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config (خدته من الـ console)
const firebaseConfig = {
  apiKey: "AIzaSyCRD-GRmhGUmtzGOSxBP0L0ObQKBC5Md2U",
  authDomain: "social-media-686a8.firebaseapp.com",
  projectId: "social-media-686a8",
  storageBucket: "social-media-686a8.firebasestorage.app",
  messagingSenderId: "853324556463",
  appId: "1:853324556463:web:9910ebaa50a62cafb58c5a",
  measurementId: "G-9Q0YYXHCY7",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// لو محتاج تستخدم app نفسه
export default app;

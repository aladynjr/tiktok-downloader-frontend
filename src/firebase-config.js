// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeWkpfzBbeBanXXHdezYpxSkGzZh3316U",
  authDomain: "tiktok-downloader-ce3be.firebaseapp.com",
  databaseURL: "https://tiktok-downloader-ce3be-default-rtdb.firebaseio.com",
  projectId: "tiktok-downloader-ce3be",
  storageBucket: "tiktok-downloader-ce3be.appspot.com",
  messagingSenderId: "16996178817",
  appId: "1:16996178817:web:d2bd57f316a64482526680"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import 'firebase/database';
import {initializeApp} from 'firebase/app' 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLip3S_P1ZkGpl1ZBZTQ6OgGWtwfUqYrI",
  authDomain: "priceteat.firebaseapp.com",
  projectId: "priceteat",
  storageBucket: "priceteat.appspot.com",
  messagingSenderId: "37830508502",
  appId: "1:37830508502:web:eb2aa27b7468b27bc92e77",
  measurementId: "G-8ZJRLXZJHR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
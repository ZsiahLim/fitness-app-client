import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDhC-0g4qZOEyEmVFsCzLz0vpnQQ2y_5i8",
    authDomain: "fitness-app-medal.firebaseapp.com",
    projectId: "fitness-app-medal",
    storageBucket: "fitness-app-medal.appspot.com",
    messagingSenderId: "1003817030348",
    appId: "1:1003817030348:web:b3cb38ec70a1c843372869"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app
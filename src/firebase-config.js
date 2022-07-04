import {initializeApp} from 'firebase/app'
import {getDatabase} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBrFy5IxtlfOf1X5A1zBPGrNW9glA6udWI",
    authDomain: "react-crud-6bbd1.firebaseapp.com",
    projectId: "react-crud-6bbd1",
    storageBucket: "react-crud-6bbd1.appspot.com",
    messagingSenderId: "482215427775",
    appId: "1:482215427775:web:3e168ffc8d2ed78080500a",
    measurementId: "G-7E44W87ZD1"
    };

const app =initializeApp(firebaseConfig);
export const db= getDatabase(app);
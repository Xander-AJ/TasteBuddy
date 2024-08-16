// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBnoa7fBfsZQhbzmp0V8UHLqdK5PDJ_hPU",
    authDomain: "tastetribe-4ce07.firebaseapp.com",
    databaseURL: "https://tastetribe-4ce07-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tastetribe-4ce07",
    storageBucket: "tastetribe-4ce07.appspot.com",
    messagingSenderId: "227524277277",
    appId: "1:227524277277:web:86c63fc6567fb8cc6802f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth }
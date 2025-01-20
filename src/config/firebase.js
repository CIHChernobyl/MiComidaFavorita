import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDJ1GFZDAXhyJ24wVrBR22D2UYtPhlNsMk",
    authDomain: "micomidafavorita-1494d.firebaseapp.com",
    projectId: "micomidafavorita-1494d",
    storageBucket: "micomidafavorita-1494d.firebasestorage.app",
    messagingSenderId: "405583303050",
    appId: "1:405583303050:web:199aed0116af06d5b03873",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

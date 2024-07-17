import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCMNet7o7UMs5AuWhBcbFnwvhLRx5vhvAY",
    authDomain: "bicos-e3e1e.firebaseapp.com",
    projectId: "bicos-e3e1e",
    storageBucket: "bicos-e3e1e.appspot.com",
    messagingSenderId: "228480768374",
    appId: "1:228480768374:web:ecfd9777982f43154f4257",
    measurementId: "G-WPHMX9LNDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { auth, db, analytics };
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBpFQttpLgTGYcoDO5G_ZrUcjBAfpSkd2g",
    authDomain: "belleza-c5b3b.firebaseapp.com",
    projectId: "belleza-c5b3b",
    storageBucket: "belleza-c5b3b.appspot.com",
    messagingSenderId: "142498497193",
    appId: "1:142498497193:web:5331ea308bfeeed08f5fb8",
    measurementId: "G-3RTHHRYYD1"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage };

export { db };
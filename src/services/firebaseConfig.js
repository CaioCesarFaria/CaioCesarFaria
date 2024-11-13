import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDsC2aF1ahdh1VsPm8JAx8fvSOw3FdQXCA",
    authDomain: "meuevento-73ecc.firebaseapp.com",
    projectId: "meuevento-73ecc",
    storageBucket: "meuevento-73ecc.firebasestorage.app",
    messagingSenderId: "1022528024118",
    appId: "1:1022528024118:web:10223cfcc343108b453297",
    measurementId: "G-DZ589PRHZ7"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

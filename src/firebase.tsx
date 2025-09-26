import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Ta configuration Firebase copiée depuis la console Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA58PrhiyxH-bYrh0gSOudirpLH4Ps8mp0",
  authDomain: "teste-9644d.firebaseapp.com",
  databaseURL: "https://teste-9644d-default-rtdb.firebaseio.com",
  projectId: "teste-9644d",
  storageBucket: "teste-9644d.firebasestorage.app",
  messagingSenderId: "974968560215",
  appId: "1:974968560215:web:1954b5dd0997ad86c36112",
  measurementId: "G-LGR8YW2305"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore (si tu veux utiliser une base de données)
const db = getFirestore(app);


export { db };

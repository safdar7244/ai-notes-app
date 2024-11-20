// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc0lSXsD8eyushIO1cItnlp6qv5nCCWtM",
  authDomain: "ai-notes-app-70742.firebaseapp.com",
  projectId: "ai-notes-app-70742",
  storageBucket: "ai-notes-app-70742.firebasestorage.app",
  messagingSenderId: "98395512956",
  appId: "1:98395512956:web:48eb8f42b10402190a69f9",
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };

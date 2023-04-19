import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7IRpd7nYTDx35wUmkFTUPQIwh35ofox8",
  authDomain: "netflix-clone-62879.firebaseapp.com",
  projectId: "netflix-clone-62879",
  storageBucket: "netflix-clone-62879.appspot.com",
  messagingSenderId: "572799149595",
  appId: "1:572799149595:web:a4905344384996c42cbabe",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBYQInhm4euQILKzH1W4JOkQ79hQp6B6XQ",
  authDomain: "instagram-clone-react-7e7e3.firebaseapp.com",
  projectId: "instagram-clone-react-7e7e3",
  storageBucket: "instagram-clone-react-7e7e3.appspot.com",
  messagingSenderId: "48019940246",
  appId: "1:48019940246:web:35f3df4612cc19a877f3b7",
  measurementId: "G-YDW8ESZN2T",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

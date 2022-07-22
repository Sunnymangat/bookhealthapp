import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAijc7cGBUZTJk8zQTFb277xdvGA1ka27E",
  authDomain: "bookhealth-db8c1.firebaseapp.com",
  databaseURL: "https://bookhealth-db8c1-default-rtdb.firebaseio.com",
  projectId: "bookhealth-db8c1",
  storageBucket: "bookhealth-db8c1.appspot.com",
  messagingSenderId: "963521897057",
  appId: "1:963521897057:web:81adb8f431039afcf20020"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export default app;
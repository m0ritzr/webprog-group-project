import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3l20qqr2K_pclMqQm3m4peQW__y3XDtA",
  authDomain: "webprog-group-project.firebaseapp.com",
  projectId: "webprog-group-project",
  storageBucket: "webprog-group-project.appspot.com",
  messagingSenderId: "953057927440",
  appId: "1:953057927440:web:6cd68f7cf4d295400b8595",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAzt-th7PhD3JomV85QEAWeLDoRi2cASBg",
  authDomain: "chat-app-5dda0.firebaseapp.com",
  projectId: "chat-app-5dda0",
  storageBucket: "chat-app-5dda0.appspot.com",
  messagingSenderId: "835430732105",
  appId: "1:835430732105:web:73818e8a73e629984d8a98",
  measurementId: "G-DTSSYC2MS4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
//const analytics = getAnalytics(app);

//useFirestoreEmulator(db, 'localhost', 8080);

export { auth, provider, db };

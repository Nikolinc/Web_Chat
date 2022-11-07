import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDteQeQVZYF4r8YNku7tyRFm-Ax7KEfElg",
  authDomain: "web-chat-react-a7dbd.firebaseapp.com",
  projectId: "web-chat-react-a7dbd",
  storageBucket: "web-chat-react-a7dbd.appspot.com",
  messagingSenderId: "774714286913",
  appId: "1:774714286913:web:6b0808638dd226da21b7c0",
  measurementId: "G-K20S1TJRXR",
};

export const fApp = initializeApp(firebaseConfig);
export const auth = getAuth(fApp);
export const firestore = getFirestore(fApp);

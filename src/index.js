import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDteQeQVZYF4r8YNku7tyRFm-Ax7KEfElg",
  authDomain: "web-chat-react-a7dbd.firebaseapp.com",
  projectId: "web-chat-react-a7dbd",
  storageBucket: "web-chat-react-a7dbd.appspot.com",
  messagingSenderId: "774714286913",
  appId: "1:774714286913:web:6b0808638dd226da21b7c0",
  measurementId: "G-K20S1TJRXR",
};

export const Context = createContext(null);
const fApp = initializeApp(firebaseConfig);
export const auth = getAuth(fApp);
export const firestore = getFirestore(fApp);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context.Provider value={{ auth, firestore }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);

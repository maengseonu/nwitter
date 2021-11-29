import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpV2D1_Dy0iNBMDtGQOzzFL7rxHxOQAS8",
  authDomain: "nwitter-5862e.firebaseapp.com",
  projectId: "nwitter-5862e",
  storageBucket: "nwitter-5862e.appspot.com",
  messagingSenderId: "611557589893",
  appId: "1:611557589893:web:bfec52ac95d36311263aec",
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth();
export const db = getFirestore();

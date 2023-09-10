

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCyHPTx8NMBI2U6VykTa_JKIBd7KIeMUAc",
  authDomain: "full-stack-web-d9c55.firebaseapp.com",
  projectId: "full-stack-web-d9c55",
  storageBucket: "full-stack-web-d9c55.appspot.com",
  messagingSenderId: "779573753677",
  appId: "1:779573753677:web:9903ade206810db2fc2904"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
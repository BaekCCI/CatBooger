import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";

// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-eIqRyTdjLxktH_K9LizWALQOIEoc5XQ",
  authDomain: "petproject-34206.firebaseapp.com",
  databaseURL: "https://petproject-34206-default-rtdb.firebaseio.com",
  projectId: "petproject-34206",
  storageBucket: "petproject-34206.appspot.com",
  messagingSenderId: "18413965445",
  appId: "1:18413965445:web:b7b01b374c6d07430619ec",
  measurementId: "G-71GKE15W6M",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

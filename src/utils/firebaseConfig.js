
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCjnAdd-CEXKPhMbpJZ4V2IHvS9hzb0xb4",
  authDomain: "parul-fabrics.firebaseapp.com",
  projectId: "parul-fabrics",
  storageBucket: "parul-fabrics.appspot.com",
  messagingSenderId: "1048633908918",
  appId: "1:1048633908918:web:493c084feba5c59ec5d017",
  measurementId: "G-BSR4VCRF8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app
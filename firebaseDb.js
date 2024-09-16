// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: 'AIzaSyDkyXUEGRJLonJEP_46WBT1Lyx-TDAvEC0',
  // authDomain: 'zaap-dc296.firebaseapp.com',
  // databaseURL: 'https://zaap-dc296.firebaseio.com',
  // projectId: 'zaap-dc296',
  // storageBucket: 'zaap-dc296.appspot.com',
  // messagingSenderId: '600651705755',
  // appId: '1:600651705755:web:703afc43f9173df2',
  // measurementId: 'G-DE0C4VCCY6',

  apiKey: 'AIzaSyBHbHmGIhY7piNuSYcvwMEom06LJZyLCoU', //
  authDomain: 'zaap-canada.firebaseapp.com', //
  projectId: 'zaap-canada',
  storageBucket: 'zaap-canada.appspot.com',
  messagingSenderId: '849033912129',
  appId: '1:849033912129:web:c51d4690012ff88efbcbc0',
  measurementId: 'G-04W5RLQHDM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const storage = getStorage(app);

export {app, db, collection, addDoc, getDocs, doc, updateDoc, setDoc, storage};

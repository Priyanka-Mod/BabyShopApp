import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBzhf_VYp7VdK8b0OsS5bxvsftfd7WpQKw',
  authDomain: 'authentication-87163.firebaseapp.com',
  projectId: 'authentication-87163',
  storageBucket: 'authentication-87163.appspot.com',
  messagingSenderId: '719293434998',
  appId: '1:719293434998:android:b46d7c4fc80536dc9fe357',
};

let app;

app = initializeApp(firebaseConfig);
// console.log('firebase connection:', app.options);

const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db}
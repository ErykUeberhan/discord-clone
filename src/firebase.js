import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAtj_81c06R5SJmISCVNMl2VG8ZctOS2P8",
    authDomain: "discord-clone-47751.firebaseapp.com",
    databaseURL: "https://discord-clone-47751.firebaseio.com",
    projectId: "discord-clone-47751",
    storageBucket: "discord-clone-47751.appspot.com",
    messagingSenderId: "207252815520",
    appId: "1:207252815520:web:10de1b465959996f7693c5",
    measurementId: "G-70RNRR6DPD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCdB3XBs4ALGqLYLUZXXQ014feBNCINuig",
    authDomain: "checkitsmart.firebaseapp.com",
    databaseURL: "https://checkitsmart-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "checkitsmart",
    storageBucket: "checkitsmart.appspot.com",
    messagingSenderId: "448014911448",
    appId: "1:448014911448:web:52129388d603803ca914ad",
    measurementId: "G-74T6YQ66N7"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
export {database, firebase as default};
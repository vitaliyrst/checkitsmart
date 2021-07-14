import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import config from "../config/config";

let database;

try {
    firebase.initializeApp(config.firebase);
    database = new firebase.firestore();
} catch (e) {
    console.log(`Error initializing firebase - ${e.message}`);
}

export default database;

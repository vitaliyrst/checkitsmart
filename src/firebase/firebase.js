import firebase from "firebase/app";
import "firebase/storage";
import "firebase/analytics";
import config from "../config/config";

let database;

try {
    firebase.initializeApp(config.firebase);
    firebase.analytics();
    database = new firebase.firestore();
} catch (e) {
    console.log(`Error initializing firebase - ${e.message}`)
}

export default database;
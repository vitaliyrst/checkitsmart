import firebase from "firebase/app";
import "firebase/storage";
import "firebase/analytics";
import config from "../config/config";

try {
    firebase.initializeApp(config.firebase);
    firebase.analytics();
} catch (e) {
    console.log(`Error initializing firebase - ${e.message}`)
}

export default firebase;
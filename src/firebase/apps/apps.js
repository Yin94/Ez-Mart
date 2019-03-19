import firebase from "firebase";
import config from "../config";
console.log("initializing firebase");
firebase.initializeApp(config);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const fileStorage = firebase.storage();

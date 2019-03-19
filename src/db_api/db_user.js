import { db } from "../firebase/apps/apps";
import { getCurrentUser } from "./db_auth";
import firebase from "firebase";
export async function fetchSavList(uid) {
  const result = [];
  const savedItemResult = [];

  try {
    const querySnapshot = await db
      .collection("favorites")
      .where("uid", "==", uid)
      .get();
    querySnapshot.forEach(item => result.push(item.data()));
    const idList = result[0].list;

    for (let id of idList) {
      const idQuerySnapShot = await db
        .collection("items")
        .where("id", "==", id)
        .get();
      idQuerySnapShot.forEach(item => {
        savedItemResult.push(item.data());
      });
    }

    return savedItemResult;
  } catch (error) {
    return error;
  }
}

export async function manageFavItem(id, mode) {
  let docKey = null;
  const uid = getCurrentUser().uid;

  let userSavedDocRef = await db
    .collection("favorites")
    .where("uid", "==", uid)
    .get();
  userSavedDocRef.forEach(item => (docKey = item.id));

  const savedArrayRef = db.collection("favorites").doc(docKey);

  const field = firebase.firestore.FieldValue;
  await savedArrayRef.update({
    list: mode ? field.arrayUnion(id) : field.arrayRemove(id)
  });
}

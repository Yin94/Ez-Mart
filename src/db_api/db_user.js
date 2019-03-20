import { db } from "../firebase/apps/apps";
import { getCurrentUser } from "./db_auth";
import { downloadFiles } from "./db_items";
import firebase from "firebase";
export async function fetchSavList(uid) {
  const result = [];
  const savedItemResult = [];
  try {
    const querySnapshot = await db
      .collection("favorites")
      .where("uid", "==", uid)
      .get();
    querySnapshot.forEach(item => {
      result.push(item.data());
    });
    const idList = result[0].list;

    for (let id of idList) {
      const idQuerySnapShot = await db
        .collection("items")
        .where("id", "==", id)
        .get();
      idQuerySnapShot.forEach(async ele => {
        savedItemResult.push(ele.data());
      });
    }

    for (let i in savedItemResult) {
      const imgs = await downloadFiles(
        savedItemResult[i].imgs,
        savedItemResult[i].id,
        "cover-img"
      );
      savedItemResult[i].imgs[0] = imgs[0];
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

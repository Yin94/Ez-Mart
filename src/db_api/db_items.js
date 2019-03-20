import { db, fileStorage } from "../firebase/apps/apps";
import { getCurrentUser } from "./db_auth";
export async function fetchItems() {
  const result = [];
  try {
    const querySnapshot = await db.collection("items").get();
    querySnapshot.forEach(item => result.push(item.data()));
    //only download cover img in the imgPath arrary
    for (let i in result) {
      const imgs = await downloadFiles(
        result[i].imgs,
        result[i].id,
        "cover-img"
      );
      result[i].imgs[0] = imgs[0];
    }
    return result;
  } catch (error) {
    return error;
  }
}

// query Item and download images
export async function queryItem(id) {
  const result = [];
  try {
    const querySnapshot = await db
      .collection("items")
      .where("id", "==", id)
      .get();
    querySnapshot.forEach(item => result.push(item.data()));
    const imgs = await downloadFiles(result[0].imgs, id);
    result[0].imgs = imgs;
    return result[0];
  } catch (error) {
    return error;
  }
}
export async function addItem(item) {
  // Add a new document with a generated id.
  const { imgs, ...form } = item;
  const files = [];
  let docRef = null;
  for (let img of imgs) {
    files.push(img.name);
  }
  form.imgs = files;
  form.favs = 0;
  form["post-time"] = new Date();
  form.publisher = getCurrentUser().id || localStorage.getItem("user-uid");
  //TODO: has consistency bug here, need to fix. can catch docId some time
  try {
    docRef = await db.collection("items").add(form);
    await upLoadFiles(imgs, docRef.id);
    await docRef.update({
      id: docRef.id
    });

    return null;
  } catch (error) {
    //keep data integrety

    try {
      await docRef.delete();
      return "error on upload, transaction discarded";
    } catch (error) {
      return "error upload delete databse item failed";
    }
  }
}

async function upLoadFiles(files, itemId) {
  // Create a root reference
  const pathArray = [];
  var storageRef = fileStorage.ref();

  // Create a reference to 'mountains.jpg'
  for (let file of files) {
    const fileRef = storageRef.child(
      "images/items/" + itemId + "/" + file.name
    );
    const result = await fileRef.put(file);
    pathArray.push(result.ref.fullPath);
  }
  return pathArray;
}

export async function downloadFiles(files, itemId, mode) {
  const pathReference = fileStorage.ref();
  const urls = [];
  if (mode === "cover-img") {
    const ref = pathReference.child("images/items/" + itemId + "/" + files[0]);
    let url = await ref.getDownloadURL();
    urls.push(url);
    return urls;
  }

  for (let file of files) {
    const ref = pathReference.child("images/items/" + itemId + "/" + file);
    let url = await ref.getDownloadURL();
    urls.push(url);
  }
  return urls;
}

export async function fetchItemPublisher(uid) {
  const result = [];
  const querySnapshot = await db
    .collection("users")
    .where("uid", "==", uid)
    .get();
  querySnapshot.forEach(item => result.push(item.data()));
  return result[0];
}

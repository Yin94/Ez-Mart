import { db, fileStorage } from "../firebase/apps/apps";
import { getCurrentUser } from "./db_auth";
export async function fetchItems() {
  const result = [];
  try {
    const querySnapshot = await db.collection("items").get();
    querySnapshot.forEach(item => result.push(item.data()));
    return result;
  } catch (error) {
    return error;
  }
}
export async function queryItem(id) {
  const result = [];
  try {
    const querySnapshot = await db
      .collection("items")
      .where("id", "==", id)
      .get();
    querySnapshot.forEach(item => result.push(item.data()));
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
  try {
    docRef = await db.collection("items").add(form);
    await upLoadFiles(imgs, docRef.id);
    await docRef.update({
      id: docRef.id
    });
    return null;
  } catch (error) {
    //keep data integrety
    console.log(error.message);
    try {
      await docRef.delete();
      return "Error on uploading the images! ";
    } catch (err) {
      return "Error on uploading the images! But item created";
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

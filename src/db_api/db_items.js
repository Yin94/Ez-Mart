import { db, fileStorage } from "../firebase/apps/apps";

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
  const docRef = await db.collection("items").add(form);

  await upLoadFiles(imgs, docRef.id);
}

async function upLoadFiles(files, itemId) {
  // Create a root reference
  var storageRef = fileStorage.ref();

  // Create a reference to 'mountains.jpg'
  for (let file of files) {
    const fileRef = storageRef.child(
      "images/items/" + itemId + "/" + file.name
    );
    await fileRef.put(file);
  }
}

// fileRef.put(files[0]).then(function(snapshot) {
//   console.log(snapshot);
// });

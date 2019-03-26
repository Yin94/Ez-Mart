import { db, fileStorage } from "../firebase/apps/apps";
import { getCurrentUser } from "./db_auth";
import firebase from "firebase";
export async function fetchItemTotalCounts() {
  // change it for better performance
  const snapShot = await db.collection("items").get();

  return snapShot.size;
}
export async function fetchItems(
  cursor,
  prevLastDocRef,
  orderSchema = "post-time"
) {
  const result = [];
  try {
    const querySnapshot = await db
      .collection("items")
      .orderBy(orderSchema)
      // .startAt("21")
      .limit(5)
      .get();
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
  // Add a new document with a generated <id className=""></id>
  const { imgs, error, displayImgs, loading, succeed, ...form } = item;

  const files = [];
  let docRef = null;
  for (let img of imgs) {
    files.push(img.name);
  }
  form.imgs = files;
  form.favs = 0;
  form["last-update-time"] = new Date();
  form.publisher = getCurrentUser().id || localStorage.getItem("user-uid");
  try {
    docRef = await db.collection("items").add(form);
    await upLoadFiles(imgs, docRef.id);
    await docRef.update({
      id: docRef.id
    });
    const postsRef = await db
      .collection("posts")
      .where("uid", "==", form.publisher)
      .get();
    let docId;
    postsRef.forEach(doc => (docId = doc.id));
    var posts = db.collection("posts").doc(docId);

    // Atomically add a new region to the "regions" array field.
    await posts.update({
      list: firebase.firestore.FieldValue.arrayUnion(docRef.id)
    });

    return null;
  } catch (error) {
    //keep data integrety

    try {
      await docRef.delete();
      // delete uploaded imgs
      return "error on upload, transaction discarded";
    } catch (error) {
      return "error upload delete databse item failed";
    }
  }
}

export async function updateItem(l_item, oldImgs) {
  const { displayImgs, error, isFirst, loading, succeed, ...item } = l_item;
  const { imgs, id, ...form } = item;

  const docRef = db.collection("items").doc(id);

  try {
    //update other data
    form.lastModifyTime = new Date();
    await docRef.update({
      ...form
    });
    // update imgs
    for (let i in imgs) {
      if (!(imgs[i] instanceof File)) continue;
      const err = await upLoadFile(imgs[i], id);
      if (err) return err;

      const doc = await docRef.get();
      const data = doc.data();
      const imgListFromServer = [...data.imgs];
      imgListFromServer[i] = imgs[i].name;
      await docRef.update({
        imgs: imgListFromServer
      });
      await deleteFile(oldImgs[i], id);
    }
  } catch (error) {
    return "Failed reaching server, please try again!";
  }
}
async function upLoadFile(file, itemId) {
  const fileRef = fileStorage
    .ref()
    .child("images/items/" + itemId + "/" + file.name);
  try {
    await fileRef.getDownloadURL();
    return (
      "Error: please change the filename of " + file.name + " and try again!"
    );
  } catch (err) {
    try {
      await fileRef.put(file);
      return null;
    } catch (error) {
      return "Failed reaching server, please try again!";
    }
  }
}
async function deleteFile(fileName, itemId) {
  // Create a reference to the file to delete
  const fileRef = fileStorage
    .ref()
    .child("images/items/" + itemId + "/" + fileName);
  // Delete the file
  await fileRef.delete();

  console.log("delete succeed!!!");
}

//
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

export async function upDateFavCount(id, mode) {
  const difference = mode ? 1 : -1;
  const docRef = await db.collection("items").doc(id);

  db.runTransaction(function(transaction) {
    // This code may get re-run multiple times if there are conflicts.
    return transaction.get(docRef).then(function(sfDoc) {
      if (!sfDoc.exists) {
        throw "Document does not exist!";
      }

      var newFavs = sfDoc.data().favs + difference;
      transaction.update(docRef, { favs: newFavs });
    });
  })
    .then(function() {
      return "succeed";
    })
    .catch(function(error) {
      console.log("Transaction failed: ", error);
    });
}

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
  orderSchema = "lastModifyTime"
) {
  console.log(cursor);
  const result = [];
  try {
    const querySnapshot = await db
      .collection("items")
      .orderBy(orderSchema)

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

    return { list: result };
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
  const { imgs, id, displayImgs, ...form } = item;
  const files = [];
  let docRef = null;
  for (let img of imgs) {
    files.push(img.name);
  }
  form.imgs = files;
  form.favs = 0;
  form["lastModifyTime"] = new Date();
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
    return { id: docRef.id };
  } catch (error) {
    //keep data integrety
    try {
      await docRef.delete();
      // delete uploaded imgs
      return "error on uploading images, transaction discarded";
    } catch (error) {
      return "error on uploading images, delete databse item failed";
    }
  }
}
export async function deleteItem(id) {
  try {
    const uid = getCurrentUser().id || localStorage.getItem("user-uid");
    const docRef = db.collection("items").doc(id);
    const snapShot = await db
      .collection("posts")
      .where("uid", "==", uid)
      .get();
    let docId = null;
    snapShot.forEach(doc => (docId = doc.id));
    const postDocRef = db.collection("posts").doc(docId);
    await postDocRef.update({
      list: firebase.firestore.FieldValue.arrayRemove(id)
    });

    await docRef.delete();
  } catch (error) {
    return error.message;
  }
}
export async function updateItem(formItem, tbd_Imgs, tba_Imgs) {
  let { displayImgs, imgs, ...item } = formItem;
  const docRef = db.collection("items").doc(item.id);
  item.lastModifyTime = new Date();
  try {
    await docRef.update({
      ...item
    });
    const storageRef = fileStorage.ref().child("images/items/" + item.id + "/");
    // deleting  imgs
    tbd_Imgs.forEach(async ele => {
      const imgRef = storageRef.child(ele);
      await imgRef.delete();
    });

    //uploading  imgs
    for (let ele of tba_Imgs) {
      const imgRef = storageRef.child(ele.name);
      await imgRef.put(ele);
      const index = imgs.indexOf(ele);
      imgs[index] = ele.name;
    }
    //update img-list
    await docRef.update({
      imgs
    });

    return null;
  } catch (err) {
    return err.message;
  }
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

// function fetch(params) {
//   var first = db.collection("cities")
//     .orderBy("population")
//     .limit(25);

//   return first.get().then(function (documentSnapshots) {
//     // Get the last visible document
//     var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
//     console.log("last", lastVisible);

//     // Construct a new query starting at this document,
//     // get the next 25 cities.
//     var next = db.collection("cities")
//       .orderBy("population")
//       .startAfter(lastVisible)
//       .limit(25);
//   });
// }

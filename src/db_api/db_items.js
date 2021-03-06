import { db, fileStorage } from '../firebase/apps/apps';
import { getCurrentUser } from './db_auth';
import firebase from 'firebase';

export async function queryItem(id) {
  const result = [];
  try {
    const querySnapshot = await db
      .collection('items')
      .where('id', '==', id)
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
  form['lastModifyTime'] = new Date();
  form.publisher = getCurrentUser().id || localStorage.getItem('user-uid');
  try {
    docRef = await db.collection('items').add(form);
    await upLoadFiles(imgs, docRef.id);

    await docRef.update({
      id: docRef.id
    });
    const postsRef = await db
      .collection('posts')
      .where('uid', '==', form.publisher)
      .get();
    let docId;
    postsRef.forEach(doc => (docId = doc.id));
    var posts = db.collection('posts').doc(docId);

    await posts.update({
      list: firebase.firestore.FieldValue.arrayUnion(docRef.id)
    });
    return { id: docRef.id };
  } catch (error) {
    try {
      await docRef.delete();

      return 'error on uploading images, transaction discarded';
    } catch (error) {
      return 'error on uploading images, delete databse item failed';
    }
  }
}
export async function deleteItem(id) {
  try {
    const uid = getCurrentUser().id || localStorage.getItem('user-uid');
    const docRef = db.collection('items').doc(id);
    const snapShot = await db
      .collection('posts')
      .where('uid', '==', uid)
      .get();
    let docId = null;
    snapShot.forEach(doc => (docId = doc.id));
    const postDocRef = db.collection('posts').doc(docId);
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
  const docRef = db.collection('items').doc(item.id);
  item.lastModifyTime = new Date();
  try {
    await docRef.update({
      ...item
    });
    const storageRef = fileStorage.ref().child('images/items/' + item.id + '/');

    tbd_Imgs.forEach(async ele => {
      const imgRef = storageRef.child(ele);
      await imgRef.delete();
    });

    for (let ele of tba_Imgs) {
      const imgRef = storageRef.child(ele.name);
      await imgRef.put(ele);
      const index = imgs.indexOf(ele);
      imgs[index] = ele.name;
    }

    await docRef.update({
      imgs
    });

    return null;
  } catch (err) {
    return err.message;
  }
}

async function upLoadFiles(files, itemId) {
  const pathArray = [];
  var storageRef = fileStorage.ref();

  for (let file of files) {
    const fileRef = storageRef.child(
      'images/items/' + itemId + '/' + file.name
    );
    const result = await fileRef.put(file);
    pathArray.push(result.ref.fullPath);
  }
  return pathArray;
}

export async function downloadFiles(files, itemId, mode) {
  const pathReference = fileStorage.ref();
  const urls = [];
  if (mode === 'cover-img') {
    const ref = pathReference.child('images/items/' + itemId + '/' + files[0]);
    let url = await ref.getDownloadURL();
    urls.push(url);
    return urls;
  }

  for (let file of files) {
    const ref = pathReference.child('images/items/' + itemId + '/' + file);
    let url = await ref.getDownloadURL();
    urls.push(url);
  }
  return urls;
}

export async function fetchItemPublisher(uid) {
  const result = [];
  const querySnapshot = await db
    .collection('users')
    .where('uid', '==', uid)
    .get();
  querySnapshot.forEach(item => result.push(item.data()));
  return result[0];
}

export async function upDateFavCount(id, mode) {
  const difference = mode ? 1 : -1;
  const docRef = await db.collection('items').doc(id);

  db.runTransaction(function(transaction) {
    return transaction.get(docRef).then(function(sfDoc) {
      if (!sfDoc.exists) {
        throw 'Document does not exist!';
      }

      var newFavs = sfDoc.data().favs + difference;
      if (newFavs < 0) return;
      transaction.update(docRef, { favs: newFavs });
    });
  })
    .then(function() {
      return 'succeed';
    })
    .catch(function(error) {
      alert('Transaction failed: ', error);
    });
}

import { db } from '../firebase/apps/apps';
import { getCurrentUser } from './db_auth';
import { downloadFiles, upDateFavCount } from './db_items';
import firebase from 'firebase';
export async function fetchSavIds(uid) {
  const result = [];

  try {
    const querySnapshot = await db
      .collection('favorites')
      .where('uid', '==', uid)
      .get();
    querySnapshot.forEach(item => {
      result.push(item.data());
    });

    const idList = result[0] ? result[0].list : [];
    return idList;
  } catch (err) {}
}
export async function fetchSavList(idList, uid, isStart) {
  const result = [];
  const savedItemResult = [];

  try {
    if (isStart) {
      const querySnapshot = await db
        .collection('favorites')
        .where('uid', '==', uid)
        .get();
      querySnapshot.forEach(item => {
        result.push(item.data());
      });

      idList = result[0] ? result[0].list : [];
    }

    for (let id of idList) {
      const idQuerySnapShot = await db
        .collection('items')
        .where('id', '==', id)
        .get();
      idQuerySnapShot.forEach(async ele => {
        savedItemResult.push(ele.data());
      });
    }

    for (let i in savedItemResult) {
      const imgs = await downloadFiles(
        savedItemResult[i].imgs,
        savedItemResult[i].id,
        'cover-img'
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
    .collection('favorites')
    .where('uid', '==', uid)
    .get();
  userSavedDocRef.forEach(item => (docKey = item.id));
  const newDoc = {
    uid: uid,
    list: []
  };
  if (!docKey) {
    docKey = (await db.collection('favorites').add(newDoc)).id;
  }
  const savedArrayRef = db.collection('favorites').doc(docKey);

  const field = firebase.firestore.FieldValue;

  await savedArrayRef.update({
    list: mode ? field.arrayUnion(id) : field.arrayRemove(id)
  });

  await upDateFavCount(id, mode);
}

export async function fetchPostIDs() {
  const uid = localStorage.getItem('user-uid');
  let user = null;
  try {
    const userRef = await db
      .collection('posts')
      .where('uid', '==', uid)
      .get();

    if (!userRef.docs.length) {
      const initialDoc = { uid, list: [] };
      await db.collection('posts').add(initialDoc);
      return [];
    } else {
      userRef.forEach(ele => (user = ele.data()));
      return user.list;
    }
  } catch (err) {
    return err;
  }
}

export async function fetchPosts(postIDs) {
  const posts = [];
  try {
    for (let id of postIDs) {
      const idQuerySnapShot = await db
        .collection('items')
        .where('id', '==', id)
        .get();
      idQuerySnapShot.forEach(async ele => {
        posts.push(ele.data());
      });
    }

    return posts;
  } catch (error) {
    return error;
  }
}

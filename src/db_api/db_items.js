import { db } from "../firebase/apps/apps";

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
export async function addItems(list) {}

const list = [
  {
    name: 11,
    id: 11,
    img: "https://m.media-amazon.com/images/I/615eoqr7gdL._AC_UL436_.jpg",
    post_time: 1,
    price: 11,
    publisher: 11
  },
  {
    name: 1,
    id: 1,
    img: "https://m.media-amazon.com/images/I/7180txmU9HL._AC_UL436_.jpg",
    post_time: 1,
    price: 1,
    publisher: 1,
    name: 1
  },
  {
    id: 1,
    img:
      "https://www.amazon.com/PFU-Hacking-Keyboard-Professional2-English/dp/B008GXQWOG/ref=sr_1_1?keywords=hhkb&qid=1552791795&s=gateway&sr=8-1",
    post_time: 1,
    price: 1,
    publisher: 1,
    name: 1
  },
  {
    id: 1,
    img: "https://m.media-amazon.com/images/I/519BiXi2sjL._AC_UL436_.jpg",
    post_time: 1,
    price: 1,
    publisher: 1,
    name: 1
  },
  {
    id: 1,
    img: "https://m.media-amazon.com/images/I/81bCZY1WXfL._AC_UL320_.jpg",
    post_time: 1,
    price: 1,
    publisher: 1
  }
];

import { db } from "../firebase/apps/apps";

export async function fetchFavList(uid) {
  const result = [];
  try {
    const querySnapshot = await db
      .collection("favorites")
      .where("uid", "==", uid)
      .get();
    querySnapshot.forEach(item => result.push(item.data()));
    // console.log(result);
    return result[0].list;
  } catch (error) {
    return error;
  }
}

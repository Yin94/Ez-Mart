import { auth, db } from "../firebase/apps/apps";

export async function authWiwthEmailAndPswd(form, mode) {
  const { pswd, confirmPswd, ...userData } = form;

  try {
    const user = mode
      ? await auth.signInWithEmailAndPassword(userData.email, pswd)
      : await auth.createUserWithEmailAndPassword(userData.email, pswd);

    userData.uid = user.user.uid;
    // add user doc
    await db.collection("users").add(userData);
    return null;
  } catch (error) {
    return error.message;
  }
}
export const getCurrentUser = () => auth.currentUser;

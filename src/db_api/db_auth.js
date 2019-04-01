import { auth, db } from '../firebase/apps/apps';

export async function authWiwthEmailAndPswd(form, mode) {
  const { pswd, confirmPswd, ...userData } = form;

  try {
    const user = mode
      ? await auth.signInWithEmailAndPassword(userData.email, pswd)
      : await auth.createUserWithEmailAndPassword(userData.email, pswd);

    if (!mode) {
      userData.uid = user.user.uid;
      await db.collection('users').add(userData);
    }
    return null;
  } catch (error) {
    return error.message;
  }
}
export const getCurrentUser = () => auth.currentUser;

export async function resetPswd(email) {
  try {
    await auth.sendPasswordResetEmail(email);
    return null;
  } catch (err) {
    return err.message;
  }
}

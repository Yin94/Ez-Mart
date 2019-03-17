import { auth } from "../firebase/apps/apps";
export async function authWiwthEmailAndPswd(email, password, mode) {
  try {
    const result = mode
      ? await auth.signInWithEmailAndPassword(email, password)
      : await auth.createUserWithEmailAndPassword(email, password);
    return result.data;
  } catch (error) {
    return error.message;
  }
}
export const getCurrentUser = () => auth.currentUser;

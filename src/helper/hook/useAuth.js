import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../firebase";
export default function useAuth() {
  const auth = getAuth(app);
  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOut = () => firebaseSignOut(auth);
  return { signUp, signIn, signOut };
}

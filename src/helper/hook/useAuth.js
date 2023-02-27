import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import app, { db } from "../firebase";
export default function useAuth() {
  const auth = getAuth(app);
  const signUp = async (email, password) => {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", user.user.uid), {
      uid: user.user.uid,
      email: user.user.email,
      role: "user",
    });
    return user;
  };

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signOut = () => firebaseSignOut(auth);
  return { signUp, signIn, signOut };
}

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCKiZCarPIr5n2DKzyKIszzkiNM6or82iE",
  authDomain: "netflix-clone-a7b78.firebaseapp.com",
  projectId: "netflix-clone-a7b78",
  storageBucket: "netflix-clone-a7b78.firebasestorage.app",
  messagingSenderId: "849893014857",
  appId: "1:849893014857:web:838771a528c75eb8c66e98",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'user', {
        uid : user.uid,
        name,
        authProvider : 'local',
        email,
    }))
  } catch (error) {
    console.log(error);
    toast.error(error.code)
  }
};

const login = async (email,password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code)
    }
}

const logout = () => {
    signOut(auth)
}

export {auth, db, signup, login, logout};
import { db } from "@/api/firebase/firebaseConfig"; // Asume que has movido la inicialización aquí
import {
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  collection,
} from "firebase/firestore";
import { type User } from "firebase/auth";

// Interfaz para el usuario en Firestore
export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoUrl: string;
  createdAt: Date;
}

export const usersRepo = {
  // Crea o actualiza un usuario en la colección 'users'
  async upsertUser(user: User): Promise<void> {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      const newUser: AppUser = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || "Usuario",
        photoUrl: user.photoURL || "",
        createdAt: new Date(),
      };
      await setDoc(userRef, newUser);
    }
  },

  // Busca un usuario por su correo electrónico
  async getUserByEmail(email: string): Promise<AppUser | null> {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0].data();
      return docData as AppUser;
    }
    return null;
  },
};

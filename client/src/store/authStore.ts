// src/store/authStore.ts

import { create } from "zustand";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { initializeApp, type FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializa Firebase fuera del store para que se haga una sola vez
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(app);

interface AuthState {
  user: User | null;
  loading: boolean;
  init: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  init: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });

    return unsubscribe;
  },
  logout: async () => {
    await auth.signOut();
    set({ user: null });
  },
}));

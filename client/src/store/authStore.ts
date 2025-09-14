// src/store/authStore.ts

import { create } from "zustand";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "@/api/firebase/firebaseConfig";

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

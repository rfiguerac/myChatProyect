// src/api/firebase/repos/chatsRepo.ts

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import type { ChatMessage } from "../../../../../common/interfaces/ChatMessage";
import { db } from "../firebaseConfig";

export const chatsRepo = {
  // Obtiene un chat por los IDs de los participantes
  async getChatByParticipants(participants: string[]): Promise<string | null> {
    const chatsCollection = collection(db, "chats");
    const q = query(chatsCollection, where("participants", "==", participants));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    }
    return null;
  },

  // Crea un nuevo chat
  async createChat(participants: string[]): Promise<string> {
    const chatsCollection = collection(db, "chats");
    const newChatRef = await addDoc(chatsCollection, {
      participants,
      createdAt: serverTimestamp(),
    });
    return newChatRef.id;
  },

  // Obtiene los mensajes de un chat
  async getChatMessages(chatId: string): Promise<ChatMessage[]> {
    const messagesCollection = collection(db, "chats", chatId, "messages");
    const q = query(messagesCollection, orderBy("createdAt"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ChatMessage[];
  },

  // Agrega un nuevo mensaje a un chat
  async addMessage(
    chatId: string,
    message: Omit<ChatMessage, "id" | "createdAt">
  ): Promise<void> {
    const messagesCollection = collection(db, "chats", chatId, "messages");
    await addDoc(messagesCollection, {
      ...message,
      createdAt: serverTimestamp(),
    });
  },
};

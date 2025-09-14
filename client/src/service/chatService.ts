// src/services/chatService.ts

import { chatsRepo } from "@/api/firebase/repository/chatsRepository";
import { usersRepo } from "@/api/firebase/repository/usersRepository";

export const chatService = (chatRepo = chatsRepo, userRepo = usersRepo) => {
  // Inicia un chat, ya sea uno nuevo o uno existente
  const startChatWithEmail = async (
    userEmail: string,
    currentUserUid: string
  ) => {
    const otherUser = await userRepo.getUserByEmail(userEmail);
    if (!otherUser) {
      throw new Error("User not found.");
    }
    const otherUserUid = otherUser.uid;

    let chatId = await chatRepo.getChatByParticipants([
      currentUserUid,
      otherUserUid,
    ]);
    if (!chatId) {
      chatId = await chatRepo.createChat([currentUserUid, otherUserUid]);
    }
    return chatId;
  };

  // Obtiene los mensajes de un chat
  const getChatMessages = async (chatId: string) => {
    return chatRepo.getChatMessages(chatId);
  };

  // Envía un mensaje a un chat
  const addMessage = async (
    chatId: string,
    senderId: string,
    messageText: string
  ) => {
    const newMessage = {
      message: messageText,
      chatId,
      senderId,
      createdAt: new Date(), // Esto se reemplazará por serverTimestamp en el repo
    };
    await chatRepo.addMessage(chatId, newMessage);
  };

  return {
    startChatWithEmail,
    getChatMessages,
    addMessage,
  };
};

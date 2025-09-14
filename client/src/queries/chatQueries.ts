// src/queries/chatQueries.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import type { ChatMessage } from "../../../common/interfaces/ChatMessage";
import { chatService } from "@/service/chatService";

const { getChatMessages, addMessage } = chatService();

// Definición de las claves de las consultas
export const chatKeys = {
  all: ["chats"],
  list: () => [...chatKeys.all, "list"],
  detail: (chatId: string) => [...chatKeys.all, "detail", chatId],
};

// Hook para obtener los mensajes de un chat
export function useChatMessages(chatId: string) {
  return useQuery<ChatMessage[]>({
    queryKey: chatKeys.detail(chatId),
    queryFn: () => getChatMessages(chatId),
    enabled: !!chatId, // Solo se ejecuta si hay un chatId
  });
}

// Hook para enviar un nuevo mensaje
export function useSendMessage(chatId: string, senderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageText: string) =>
      addMessage(chatId, senderId, messageText),
    onSuccess: () => {
      // Invalida la caché de mensajes para recargar la lista
      queryClient.invalidateQueries({ queryKey: chatKeys.detail(chatId) });
    },
  });
}

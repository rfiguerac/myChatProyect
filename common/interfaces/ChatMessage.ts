export interface NewChatMessage {
  message: string;
  senderId: string;
  createdAt: Date | any; // Usamos `any` para `serverTimestamp()`
}

export interface ChatMessage {
  id: string;
  message: string;
  senderId: string;
  createdAt: Date;
}

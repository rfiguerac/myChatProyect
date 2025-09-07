export interface ChatMessage {
  id: string;
  message: string;
  chatId: string;
  senderId: string;
  receiverId?: string;
  createdAt: Date;
}

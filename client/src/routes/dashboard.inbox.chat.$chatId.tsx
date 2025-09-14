import { ChatBox } from "@/components/chat/ChatBox";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/inbox/chat/$chatId")({
  component: ChatBox,
});

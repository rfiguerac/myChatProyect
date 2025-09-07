import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import { Send } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useRef, useState } from "react";

import { type ChatMessage } from "../../../../common/interfaces/ChatMessage";

export const ChatBox = () => {
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Scroll automático al final
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmitMessage = () => {
    // Lógica para enviar el mensaje
  };

  return (
    <div className="flex min-h-svh items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <Avatar className="rounded-lg">
              <AvatarImage src={user?.photoURL!} alt="@user-avatar" />
            </Avatar>
          </CardTitle>
          <CardAction>
            {/* <Button onClick={handleSignOut}>
              <LogOut />
              Cerrar Sesión
            </Button> */}
          </CardAction>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-72 w-full">
            <div className="flex flex-col gap-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[75%] p-2 px-3 rounded-2xl text-sm break-words ${
                    message.senderId === user?.uid
                      ? "bg-green-500 text-white self-end rounded-br-none"
                      : "bg-gray-200 text-gray-900 self-start rounded-bl-none"
                  }`}>
                  {message.message}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <div className="flex w-full max-w-sm items-center gap-2">
            <form className="flex w-full gap-2" onSubmit={handleSubmitMessage}>
              <Input
                type="text"
                name="message"
                placeholder="Type your message..."
              />
              <Button type="submit" variant="outline">
                <Send />
              </Button>
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

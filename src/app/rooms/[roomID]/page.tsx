"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { config } from "~/auth/config";
import { useAuth } from "~/auth/useAuth";
import { Button } from "~/components/ui/button";

export const wsMessageSchema = z.object({
  userID: z.string(),
  username: z.string(),
  roomID: z.string(),
  content: z.string().optional(),
  timestamp: z.coerce.date(),
});
export type wsMessage = z.infer<typeof wsMessageSchema>;

export default function RoomPage() {
  const { user } = useAuth();
  const socketRef = useRef<WebSocket | undefined>(undefined);
  const [messages, setMessages] = useState<wsMessage[]>([]);
  const [input, setInput] = useState("");
  const params = useParams<{ roomID: string }>();

  useEffect(() => {
    const websocket = new WebSocket(
      `${config.BACKEND_API_URL}/chat?roomID=${params.roomID}`,
    );
    socketRef.current = websocket;

    websocket.addEventListener("open", () => {
      toast("connected to chat successfully");
    });

    websocket.addEventListener("message", (event) => {
      console.log("msg received!")
      const data = typeof event.data === "string" ? event.data : "";
      if (data.length === 0) {
        console.log("data length 0")
        return;
      }
      console.log(data);

      const parsed = wsMessageSchema.safeParse(JSON.parse(data));
      if (parsed.success) {
        console.log("parsed:", parsed.data);
        setMessages((prevMessages) => [...prevMessages, parsed.data]);
      }
    });

    websocket.addEventListener("close", () => {
      toast("disconnected from room");
    });

    websocket.addEventListener("error", (err) => {
      toast(`error: ${err.type}`);
    });

    async function fetchChats() {
      return 1;
    }

    void fetchChats();

    return () => {
      if (
        websocket.readyState === WebSocket.OPEN ||
        websocket.readyState === WebSocket.CONNECTING
      ) {
        websocket.close();
      }
      socketRef.current = undefined;
    };
  }, [params.roomID]);

  function handleSendMessage() {
    if (input.length === 0) {
      toast("you must enter something");
      return;
    }
    if (!user) {
      return;
    }

    const message: wsMessage = {
      userID: user.id,
      username: user.username,
      roomID: params.roomID,
      timestamp: new Date(),
      content: input,
    };
    socketRef.current?.send(JSON.stringify(message));
  }

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i}>{msg.content}</div>
        ))}
      </div>

      <div className="p-4">
        <input
          type="text"
          className="w-full rounded p-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSendMessage}>send</Button>
      </div>
    </div>
  );
}

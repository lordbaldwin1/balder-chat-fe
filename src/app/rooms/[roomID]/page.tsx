"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { config } from "~/auth/config";
import { useAuth } from "~/auth/useAuth";

export default function RoomPage() {
  const { user } = useAuth();
  const socketRef = useRef<WebSocket | undefined>(undefined);
  const [messages, setMessages] = useState<string[]>([]);
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
      const data = typeof event.data === "string" ? event.data : "";
      setMessages((prevMessages) => [...prevMessages, data]);
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
      if (websocket.readyState === WebSocket.OPEN || websocket.readyState === WebSocket.CONNECTING) {
        websocket.close();
      }
      socketRef.current = undefined;
    };
  }, [params.roomID]);

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <div className="flex-1 space-y-2 overflow-y-auto p-4">
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
        <div className="rounded p-2">Hello 👋</div>
        <div className="rounded p-2">How are you?</div>
      </div>

      <div className="p-4">
        <input
          type="text"
          className="w-full rounded p-2"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function RoomPage() {
  const params = useParams<{ roomID: string }>();
  console.log(params.roomID);

  useEffect(() => {
    async function fetchChats() {
      return 1;
    }

    void fetchChats();
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
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

"use client";

import { Loader } from "lucide-react";
import { useState } from "react";
import { config } from "~/auth/config";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function RoomsPage() {
  return (
    <div>
      <h1>rooms</h1>
      <CreateRoomDialog />
    </div>
  );
}

export function CreateRoomDialog() {
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateRoom() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${config.BACKEND_API_URL}/api/rooms/create`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ room: room }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText.toLowerCase()}`,
        );
      }
    } catch (err) {
      console.warn(err);
      if (err instanceof Error) {
        setError(`failed to create room: ${err.message}`);
      } else {
        setError("failed to create room, try again soon");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setError("");
          }}
        >
          create room
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>create room</DialogTitle>
          <DialogDescription>
            create a room so others may join and chat. click create room when
            done naming.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <div className="flex flex-row gap-2 text-sm">
              <Label htmlFor="room-name">room name</Label>
              <span className="text-red-600">{error} </span>
            </div>
            <Input
              type="text"
              id="room-name"
              name="room-name"
              placeholder="enter room name"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">cancel</Button>
          </DialogClose>
          <Button onClick={handleCreateRoom}>
            {loading ? <Loader className="animate-spin" /> : "create room"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

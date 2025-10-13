"use client";

import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { config } from "~/auth/config";
import type { RoomResponse } from "~/auth/types";
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
import { toast } from "sonner";
import Link from "next/link";

export default function RoomsPage() {
  const [rooms, setRooms] = useState<RoomResponse[]>([]);

  useEffect(() => {
    async function fetchRooms() {
      const response = await fetch(`${config.BACKEND_API_URL}/api/rooms`, {
        method: "GET",
      });

      const rooms = (await response.json()) as RoomResponse[];
      setRooms(rooms);
    }
    void fetchRooms();
  }, []);

  function onRoomCreated(newRoom: RoomResponse) {
    setRooms((prevRooms) => [...prevRooms, newRoom]);
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <h1>rooms</h1>
      <CreateRoomDialog onRoomCreated={onRoomCreated} />
      {rooms.map((room) => (
        <div key={room.id}>
          <Link href={`/rooms/${room.id}`}>
            <Button className="cursor-pointer">{room.name}</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}

type CreateRoomDialogProps = {
  onRoomCreated: (room: RoomResponse) => void;
};
export function CreateRoomDialog({ onRoomCreated }: CreateRoomDialogProps) {
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateRoom() {
    setLoading(true);
    setError("");

    try {
      console.log(room);
      const response = await fetch(
        `${config.BACKEND_API_URL}/api/rooms/create`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ room: room }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText.toLowerCase()}`,
        );
      }

      const createdRoom = (await response.json()) as RoomResponse;
      onRoomCreated(createdRoom);
      toast(`${createdRoom.name} created by user ${createdRoom.ownerId}`);
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

export type CreateUserResponse = {
  id: string;
  username: string;
  createdAt: Date;
};

export type User = {
  id: string;
  username: string;
  createdAt: Date;
} | null;

export type RoomResponse = {
  id: string;
  name: string;
  ownerId: string;
};
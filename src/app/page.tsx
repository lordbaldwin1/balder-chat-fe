"use client";

import { Loader2 } from "lucide-react";
import { config } from "~/auth/config";
import { useAuth } from "~/auth/useAuth";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  const { user, loading, refetch } = useAuth();

  async function handleLogin() {
    try {
      await fetch(`${config.BACKEND_API_URL}/users/create`, {
        method: "POST",
        credentials: "include",
      });
      await refetch();
    } catch (err: unknown) {
      console.error(
        err instanceof Error ? err.message : "Unknown error occurred"
      );
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {loading ? <Loader2 className="animate-spin"/> : user?.username}
      <Button onClick={handleLogin}>start chatting</Button>
    </main>
  );
}

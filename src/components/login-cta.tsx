"use client";

import { useRouter } from "next/navigation";
import { config } from "~/auth/config";
import { Button } from "./ui/button";

export default function LoginCTA() {
  const router = useRouter();

  async function handleLogin() {
    try {
      await fetch(`${config.BACKEND_API_URL}/api/users/create`, {
        method: "POST",
        credentials: "include",
      });
      router.push("/rooms");
    } catch (err: unknown) {
      console.error(
        err instanceof Error ? err.message : "Unknown error occurred",
      );
    }
  }
  return (
    <section className="space-y-6 flex flex-col justify-center items-center mx-auto">
      {/* <h2 className="text-xl">hi</h2> */}
      <Button onClick={handleLogin}>start chatting</Button>
    </section>
  );
}

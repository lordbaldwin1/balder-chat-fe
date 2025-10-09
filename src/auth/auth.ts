import { config } from "./config";
import type { User } from "./types"

export async function checkAuth() {
    try {
        const res = await fetch(`${config.BACKEND_API_URL}/users`, {
            method: "GET",
            credentials: "include",
        });

        if (res.ok) {
            const user = (await res.json()) as User;
            return user;
        }
    } catch (err: unknown) {
        console.error(err instanceof Error ? err.message : "Unknown error occurred");
        return null;
    }
}
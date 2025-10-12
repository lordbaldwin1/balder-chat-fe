import { useState, useEffect } from 'react';
import { checkAuth } from './auth';
import type { User } from './types';
import { config } from './config';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      try {
        setLoading(true);
        setError(null);
        const user = await checkAuth();
        setUser(user ?? null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Authentication failed');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    void authenticate();
  }, []);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await checkAuth();
      setUser(user ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const res = await fetch(`${config.BACKEND_API_URL}/users/logout`, {
        method: "POST",
        credentials: "include",
    });
    if (!res.ok) {
        console.error("Failed to logout?");
        return;
    }
    setUser(null);
    setError(null);
    router.push("/");
  };

  return {
    user,
    loading,
    error,
    logout,
    refetch,
  };
}
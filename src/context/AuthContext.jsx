"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useToast } from "@/components/Toast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("bloodlink_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api("/api/auth/me")
      .then(setUser)
      .catch(() => localStorage.removeItem("bloodlink_token"))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      setUser,
      async login(payload) {
        const data = await api("/api/auth/login", { method: "POST", body: JSON.stringify(payload) });
        localStorage.setItem("bloodlink_token", data.token);
        setUser(data.user);
        toast("Login successful. Welcome back!");
        router.push("/dashboard");
      },
      async register(payload) {
        const data = await api("/api/auth/register", { method: "POST", body: JSON.stringify(payload) });
        localStorage.setItem("bloodlink_token", data.token);
        setUser(data.user);
        toast("Registration successful. Welcome to BloodLink!");
        router.push("/dashboard");
      },
      logout() {
        localStorage.removeItem("bloodlink_token");
        setUser(null);
        router.push("/login");
      },
    }),
    [user, loading, router, toast]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

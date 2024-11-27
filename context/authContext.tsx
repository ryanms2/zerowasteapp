/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { createContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import { api } from "@/services/api";
import { AuthContextType, AuthTokenType, SignInData, User } from "@/types";
import { useRouter } from "next/navigation";
import { login } from "@/auth";

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  async function signIn({ email, password }: SignInData) {
    try {
      const result = await login({ email, password });
      setUser(result.user);
      router.push("/dashboard");
    } catch (error) {
      return error;
    }
    
  }

  function signOut() {
    destroyCookie(undefined, "zerowaste.token");
    setUser(null);
    router.push("/login");
  }

  useEffect(() => {
    const { "zerowaste.token": token } = parseCookies();
    
    if (!token) return;

    const validateTokenAndSetUser = async () => {
      try {
        // Validate token expiration
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const isTokenExpired = Date.now() >= tokenPayload.exp * 1000;
        
        if (isTokenExpired) {
          destroyCookie(undefined, "zerowaste.token");
          return;
        }

        // Validate token with API and set user data
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        const response: AuthTokenType = await api.get("/me");
        const { id, name, email, role } = response.data;

        setUser({ id, name, email, role });

      } catch {
        destroyCookie(undefined, "zerowaste.token");
        signOut();
      }
    };

    validateTokenAndSetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
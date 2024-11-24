/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { createContext, useEffect, useState } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { api } from "@/services/api";
import { AuthContextType, AuthTokenType, SignInData, User } from "@/types";
import { useRouter } from "next/navigation";

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const router = useRouter();

  async function signIn({ email, password }: SignInData) {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { token } = response.data;

      setCookie(undefined, "zerowaste.token", token, {
        maxAge: 60 * 60 * 24, // 24 hours
      });
      
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      router.push("/dashboard");
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
  }

  function signOut() {
    destroyCookie(undefined, "zerowaste.token");
    setUser(null);
    router.push("/login");
  }

  useEffect(() => {
    const { "zerowaste.token": token } = parseCookies();

    if (token) {
      const validateToken = async () => {
        try {
          api.defaults.headers["Authorization"] = `Bearer ${token}`;
          const validateToken: AuthTokenType = await api.get("/me");

          console.log(validateToken.data);

          setUser({
            id: validateToken.data.id,
            name: validateToken.data.name,
            email: validateToken.data.email,
            role: validateToken.data.role,
          });
        } catch (error: any) {
          signOut();
        }
      };
      validateToken();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
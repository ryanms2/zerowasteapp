/* eslint-disable @typescript-eslint/no-explicit-any */
"server-only"

import { api } from "@/services/api";
import { SignInData } from "@/types";
import { setCookie } from "nookies";

export async function login({ email, password }: SignInData) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    const { access_token } = response.data;

    setCookie(undefined, "zerowaste.token", access_token, {
      maxAge: 60 * 60 * 1, // 1 hours
    });

    api.defaults.headers["Authorization"] = `Bearer ${access_token}`;

    return response.data;
  } catch (error: any) {
    return error.response?.data?.message || "Erro ao fazer login"
  }
}
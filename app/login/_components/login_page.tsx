"use client"

import { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export const metadata: Metadata = {
  title: "Login | ZeroWasteApp",
  description: "Faça login na sua conta do ZeroWasteApp",
}

export function LoginPage() {

  useEffect(() => {
    
  },[])
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-muted-foreground">
            Entre com seu e-mail e senha para acessar sua conta
          </p>
        </div>
        <LoginForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-primary">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  )
}


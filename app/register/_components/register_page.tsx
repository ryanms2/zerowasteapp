"use client"

import { Metadata } from "next"
import Link from "next/link"
import { RegisterForm } from "@/components/register-form"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Registro | ZeroWasteApp",
  description: "Crie sua conta no ZeroWasteApp",
}

export function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Crie sua conta
          </h1>
          <p className="text-sm text-muted-foreground">
            Preencha os campos abaixo para se registrar no ZeroWasteApp
          </p>
        </div>
        <RegisterForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/login" className="underline underline-offset-4 hover:text-primary">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  )
}


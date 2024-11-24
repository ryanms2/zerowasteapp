import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { api } from "@/services/api"
import { setCookie } from "nookies"

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um endereço de e-mail válido.",
  }),
  password: z.string().min(5, {
    message: "A senha deve ter pelo menos 5 caracteres.",
  }),
})

type responseSchemaProps = {
  data: {
    access_token: string,
  },
}

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setIsLoading(true)
    
    // TODO: Implement actual login logic here
    try {
      await api.post("/login", data).then((response: responseSchemaProps) => {

        setCookie(null, "zerowaste.token", response.data.access_token, {
          maxAge: 60 * 60 * 1,
        })
        

        setIsLoading(false)
        toast({
          title: "Login bem-sucedido!",
          description: "Você será redirecionado para o painel.",
        })
        router.push("/dashboard")
    })
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Erro ao fazer login",
        description: "Email ou senha incorretos.",
      })
      return
      
    }
       

      
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  )
}


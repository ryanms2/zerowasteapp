"use client"

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
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "O nome de usuário deve ter pelo menos 2 caracteres.",
    })
    .max(30, {
      message: "O nome de usuário não pode ter mais de 30 caracteres.",
    }),
  email: z
    .string()
    .email({
      message: "Por favor, insira um endereço de e-mail válido.",
    }),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: "Por favor, insira uma URL válida." }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

const defaultValues: Partial<ProfileFormValues> = {
  bio: "Eu sou um usuário do ZeroWasteApp!",
  urls: [
    { value: "https://example.com" },
    { value: "https://example2.com" },
  ],
}

export function SettingsForm({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })
  const { toast } = useToast()

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Você enviou os seguintes valores:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <div className={className}>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>
            Atualize suas informações de perfil. Seu nome de usuário será visível para outros usuários.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de usuário</FormLabel>
                    <FormControl>
                      <Input placeholder="zerowaste_user" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este é o seu nome de usuário público. Pode ser seu nome real ou um pseudônimo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="exemplo@zerowaste.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Este é o seu endereço de e-mail registrado.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Conte-nos um pouco sobre você"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Você pode escrever uma breve descrição sobre você. Máximo de 160 caracteres.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Atualizar perfil</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notificações</CardTitle>
          <CardDescription>
            Configure suas preferências de notificação.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Notificações por e-mail</h3>
              <p className="text-sm text-muted-foreground">Receba atualizações por e-mail sobre novas ofertas.</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Notificações push</h3>
              <p className="text-sm text-muted-foreground">Receba notificações push sobre ofertas próximas a você.</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


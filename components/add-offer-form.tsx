"use client"

import { useState } from "react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const offerFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome do produto deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Insira um preço válido (ex: 10.99)",
  }),
  originalPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, {
    message: "Insira um preço válido (ex: 10.99)",
  }),
  quantity: z.string().min(1, {
    message: "A quantidade é obrigatória.",
  }),
  category: z.string().min(1, {
    message: "Selecione uma categoria.",
  }),
  expirationDate: z.string().min(1, {
    message: "A data de expiração é obrigatória.",
  }),
})

type OfferFormValues = z.infer<typeof offerFormSchema>

export function AddOfferForm({ onSuccess }: { onSuccess: () => void }) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      quantity: "",
      category: "",
      expirationDate: "",
    },
  })

  async function onSubmit(data: OfferFormValues) {
    setIsLoading(true)
    
    // TODO: Implement actual offer creation logic here
    console.log(data)

    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    setIsLoading(false)
    toast({
      title: "Oferta adicionada com sucesso!",
      description: "Sua nova oferta foi criada e está disponível para os usuários.",
    })
    onSuccess()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Produto</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Pão Francês" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descreva o produto..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 5.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="originalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço Original</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 10.99" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input placeholder="Ex: 10 unidades" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Padaria">Padaria</SelectItem>
                  <SelectItem value="Hortifruti">Hortifruti</SelectItem>
                  <SelectItem value="Laticínios">Laticínios</SelectItem>
                  <SelectItem value="Pratos Prontos">Pratos Prontos</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Expiração</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Adicionando..." : "Adicionar Oferta"}
        </Button>
      </form>
    </Form>
  )
}


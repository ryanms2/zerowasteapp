/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export function OfferForm({ offer, onSubmit }: { offer?: any, onSubmit: (data: any) => void }) {
  const form = useForm<z.infer<typeof offerFormSchema>>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: offer || {
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      quantity: "",
      category: "",
      expirationDate: "",
    },
  })

  function handleSubmit(values: z.infer<typeof offerFormSchema>) {
    onSubmit(values)
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <FormField
        name="name"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome do Produto</FormLabel>
            <FormControl>
              <Input placeholder="Nome do Produto" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="description"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição</FormLabel>
            <FormControl>
              <Textarea placeholder="Descrição do Produto" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="price"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço</FormLabel>
            <FormControl>
              <Input placeholder="Preço" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="originalPrice"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preço Original</FormLabel>
            <FormControl>
              <Input placeholder="Preço Original" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="quantity"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Quantidade</FormLabel>
            <FormControl>
              <Input placeholder="Quantidade" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="category"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Categoria</FormLabel>
            <FormControl>
              <Select {...field}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Padaria">Padaria</SelectItem>
                  <SelectItem value="Hortifruti">Hortifruti</SelectItem>
                  <SelectItem value="Laticínios">Laticínios</SelectItem>
                  <SelectItem value="Pratos Prontos">Pratos Prontos</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="expirationDate"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data de Expiração</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Salvar Oferta</Button>
    </form>
  )
}
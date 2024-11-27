"use client"

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Trash2, PlusCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { addOffer, deleteOffer, getActiveOffers, meId, updateOffer } from '@/services/data'
import { parseCookies } from 'nookies'
import { FoodProps, FoodUpdateProps } from '@/types'

export function MyOffers({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [myOffers, setMyOffers] = useState<FoodUpdateProps[]>([])
  const [filteredOffers, setFilteredOffers] = useState<FoodUpdateProps[]>(myOffers)
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingOffer, setEditingOffer] = useState<FoodUpdateProps | null>(null)
  const [isAddOfferOpen, setIsAddOfferOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [offerToDelete, setOfferToDelete] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { "zerowaste.token": token } = parseCookies();
      const response = await getActiveOffers(token)
      if (response === 'Unauthorized') {
        setMyOffers([])
        return
      }
      setMyOffers(response)
      setFilteredOffers(response)
    }
    fetchData()
  }, [])
  const handleFilter = (status: 'Available' | 'Expired' | 'Reserved' | 'all') => {
    setStatusFilter(status)
    setFilteredOffers(status === 'all' ? myOffers : myOffers.filter(offer => offer.status === status))
  }

  const handleEdit = (offer: FoodUpdateProps) => setEditingOffer(offer)

  const handleDelete = (id: number) => {
    setOfferToDelete(id)
    setIsDeleteConfirmOpen(true)
  }

  const confirmDelete = async() => {
    if (offerToDelete) {
      const { "zerowaste.token": token } = parseCookies();
      const updatedOffers = myOffers.filter(offer => offer.id !== offerToDelete)
      const response = await deleteOffer( token, offerToDelete )
      if (response !== 'Unauthorized' && response !== 'Internal server error') {
        setMyOffers(updatedOffers)
        setFilteredOffers(updatedOffers)
        setIsDeleteConfirmOpen(false)
        setOfferToDelete(null)
        toast({ title: "Anúncio excluído", description: "O anúncio foi excluído com sucesso." })
      }
    }
  }

  const handleSaveEdit = async (editedOffer: FoodUpdateProps) => {
    const { "zerowaste.token": token } = parseCookies();
    const response = await updateOffer(token, { offer: editedOffer })
    
    if (response !== 'Unauthorized' && response !== 'Internal server error') {
      const updatedOffers = myOffers.map(offer => (offer.id === editedOffer.id ? editedOffer : offer))
      setMyOffers(updatedOffers)
      setFilteredOffers(updatedOffers)
      setEditingOffer(null)
      toast({ title: "Anúncio atualizado", description: "As alterações foram salvas com sucesso." })
    }
  }

  const handleAddOffer = async (newOffer: FoodUpdateProps) => {
    const { "zerowaste.token": token } = parseCookies();
    const fetchUserId = await meId(token)
    const userId = Number(fetchUserId)

    // Validate new offer data
    if (!newOffer.name || !newOffer.category || newOffer.price <= 0 || newOffer.quantity <= 0) {
      toast({ title: "Erro", description: "Por favor, preencha todos os campos corretamente." })
      return
    }

    const response = await addOffer(token, { offer: { ...newOffer, userId } })
    if (response !== 'Unauthorized' && response !== 'Internal server error') {
      const updatedOffers = [...myOffers, { ...newOffer, userId, id: response.id }]
      setMyOffers(updatedOffers)
      setFilteredOffers(updatedOffers)
      setIsAddOfferOpen(false)
      toast({ title: "Novo anúncio adicionado", description: "O novo anúncio foi criado com sucesso." })
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Meus Anúncios</CardTitle>
          <Dialog open={isAddOfferOpen} onOpenChange={setIsAddOfferOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Anúncio
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Anúncio</DialogTitle>
                <DialogDescription>Preencha os detalhes do novo anúncio abaixo.</DialogDescription>
              </DialogHeader>
              <AddOfferForm onSubmit={handleAddOffer} />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={statusFilter} onValueChange={handleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Available">Ativo</SelectItem>
              <SelectItem value="Reserved">Reservado</SelectItem>
              <SelectItem value="Expired">Expirado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOffers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.name}</TableCell>
                <TableCell>
                  <span className="font-bold">{offer.price}</span>
                  <span className="text-sm line-through ml-2 text-muted-foreground">{offer.originalPrice}</span>
                </TableCell>
                <TableCell>{new Date(offer.expiration).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}</TableCell>
                <TableCell>{offer.quantity}</TableCell>
                <TableCell>{offer.category}</TableCell>
                <TableCell>
                  <Badge variant={offer.status === 'Available' ? 'default' : offer.status === 'Reserved' ? 'secondary' : 'destructive'}>
                    {offer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog open={editingOffer?.id === offer.id} onOpenChange={(open) => {
                      if (!open) setEditingOffer(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(offer)} className="hover:bg-secondary">
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Editar Anúncio</DialogTitle>
                          <DialogDescription>Faça as alterações necessárias no seu anúncio abaixo.</DialogDescription>
                        </DialogHeader>
                        {editingOffer && <EditOfferForm offer={editingOffer} onSubmit={handleSaveEdit} />}
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(offer.id as number)} className="hover:bg-destructive hover:text-destructive-foreground">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Excluir
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>Tem certeza que deseja excluir este anúncio? Esta ação não pode ser desfeita.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={confirmDelete}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

function AddOfferForm({ onSubmit }: { onSubmit: (offer: FoodProps) => void }) {
  const [newOffer, setNewOffer] = useState<FoodProps>({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    expiration: new Date().toISOString(),
    quantity: 0,
    location: '',
    status: 'Available',
    userId: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate new offer data
    if (!newOffer.name || !newOffer.category || newOffer.price < 0 || newOffer.quantity < 0) {
      toast({ title: "Erro", description: "Por favor, preencha todos os campos corretamente." })
      return
    }
    onSubmit(newOffer)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome do Produto</Label>
          <Input id="name" value={newOffer.name} onChange={(e) => setNewOffer({ ...newOffer, name: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select value={newOffer.category} onValueChange={(value) => setNewOffer({ ...newOffer, category: value })}>
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
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Preço</Label>
          <Input id="price" type="number" value={newOffer.price || ''} onChange={(e) => setNewOffer({ ...newOffer, price: Number(e.target.value) })} required />
        </div>
        <div>
          <Label htmlFor="originalPrice">Preço Original</Label>
          <Input id="originalPrice" type="number" value={newOffer.originalPrice || ''} onChange={(e) => setNewOffer({ ...newOffer, originalPrice: Number(e.target.value) })} required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Quantidade</Label>
          <Input id="quantity" type="number" value={newOffer.quantity || ''} onChange={(e) => setNewOffer({ ...newOffer, quantity: Number(e.target.value) })} required />
        </div>
        <div>
          <Label htmlFor="expiration">Data de Expiração</Label>
          <Input id="expiration" type="date" value={new Date(newOffer.expiration).toISOString().split('T')[0]} onChange={(e) => setNewOffer({ ...newOffer, expiration: e.target.value + "T21:45:25.979Z" })} required />
        </div>
        <div>
          <Label htmlFor="location">Localização</Label>
          <Input id="location" value={newOffer.location} onChange={(e) => setNewOffer({ ...newOffer, location: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor='description'>Descrição</Label>
          <Input id='description' value={newOffer.description} onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })} required />
        </div>
      </div>
      <Button type="submit" className="w-full">Adicionar Anúncio</Button>
    </form>
  )
}

function EditOfferForm({ offer, onSubmit }: { offer: FoodUpdateProps, onSubmit: (offer: FoodUpdateProps) => void }) {
  const [editedOffer, setEditedOffer] = useState({...offer, updatedAt: new Date().toISOString()})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate edited offer data
    if (!editedOffer.name || !editedOffer.category || editedOffer.price < 0 || editedOffer.quantity < 0) {
      toast({ title: "Erro", description: "Por favor, preencha todos os campos corretamente." })
      return
    }
    onSubmit(editedOffer)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome do Produto</Label>
          <Input id="name" value={editedOffer.name} onChange={(e) => setEditedOffer({ ...editedOffer, name: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor="category">Categoria</Label>
          <Select value={editedOffer.category} onValueChange={(value) => setEditedOffer({ ...editedOffer, category: value })}>
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
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Preço</Label>
          <Input id="price" type="number" value={editedOffer.price || ''} onChange={(e) => setEditedOffer({ ...editedOffer, price: Number(e.target.value) })} required />
        </div>
        <div>
          <Label htmlFor="originalPrice">Preço Original</Label>
          <Input id="originalPrice" type="number" value={editedOffer.originalPrice || ''} onChange={(e) => setEditedOffer({ ...editedOffer, originalPrice: Number(e.target.value) })} required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="quantity">Quantidade</Label>
          <Input id="quantity" type="number" value={editedOffer.quantity || ''} onChange={(e) => setEditedOffer({ ...editedOffer, quantity: Number(e.target.value) })} required />
        </div>
        <div>
          <Label htmlFor="expiration">Data de Expiração</Label>
          <Input id="expiration" type="date" value={new Date(editedOffer.expiration).toISOString().split('T')[0]} onChange={(e) => setEditedOffer({ ...editedOffer, expiration: e.target.value + "T21:45:25.979Z" })} required />
        </div>
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={editedOffer.status} onValueChange={(value: 'Available' | 'Expired' | 'Reserved') => setEditedOffer({ ...editedOffer, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Available">Ativo</SelectItem>
            <SelectItem value="Reserved">Reservado</SelectItem>
            <SelectItem value="Expired">Expirado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
          <Label htmlFor="location">Localização</Label>
          <Input id="location" value={editedOffer.location} onChange={(e) => setEditedOffer({ ...editedOffer, location: e.target.value })} required />
        </div>
        <div>
          <Label htmlFor='description'>Descrição</Label>
          <Input id='description' value={editedOffer.description} onChange={(e) => setEditedOffer({ ...editedOffer, description: e.target.value })} required />
        </div>
      <Button type="submit" className="w-full">Salvar Alterações</Button>
    </form>
  )
}

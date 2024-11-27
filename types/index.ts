export type SignInData = {
    email: string;
    password: string;
}

export type FormData = {
    name: string
    email: string
    password: string
}

export type Response = {
  data: {
    "message": string;
    "credentials": [
      {
        "id": number;
        "nome": string;
        "email": string;
      }
    ],
    "token": string;
  }
    
}

export type User = {
    id: number;
    name: string;
    email: string;
    role: string;
}

export type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    updateUser?: (data: User) => Promise<void>;
    signIn: (data: SignInData) => Promise<void | unknown>;
    signOut: () => void;
}

export type AuthTokenType = {
  data: {
    id: number;
    email: string;
    name: string;
    role: string;
  }
  
}

export type TaskUpdateStatusProps = {
    id: number;
    concluido_em: null | Date;
    status: string;
}

export type TaskUpdateProps = {
    id: number;
    token: string;
    titulo: string;
    descricao: string;
}

export type TaskUpdateChartsProps = {
    id: number;
    titulo: string;
    descricao: string;
    criado_em: Date;
    concluido_em: null | Date;
    status: string;
}

export type RecentActivitiesProps = {
    id: number;
    action: string;
    task: string;
    user_image: string;
    user_name: string;
    timestamp: string;
}

export type FoodUpdateProps = {
  id?: number
  name: string
  description: string
  expiration: string
  quantity: number
  price: number
  originalPrice: number
  category: string
  location: string
  status: 'Available' | 'Expired' | 'Reserved'
  userId: number
  createdAt: string
  updatedAt: string
}

export type FoodProps = {
  name: string
  description: string
  expiration: string
  quantity: number
  price: number
  originalPrice: number
  category: string
  location: string
  status: 'Available' | 'Expired' | 'Reserved'
  userId: number
  createdAt: string
  updatedAt: string
}
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { FoodProps, FoodUpdateProps } from "@/types";
// import { TaskUpdateProps, TaskUpdateStatusProps } from "@/types";
import { api } from "./api";

export async function getActiveOffers(token: string) {
    try {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        const { data } = await api.get("/foods");
        return data; 
    } catch (error: any) {
        return error.response?.data?.message || "Erro ao buscar ofertas";
        
    }
    
}

export async function getUsers(token: string) {
    try {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        const { data } = await api.get("/users");
        return data.length;
    } catch (error: any) {
        return error.response?.data?.message || "Erro ao buscar usuários";
    }
}

export async function meId(token: string) {
    try {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        const { data } = await api.get("/me");
        return data.id;
    } catch (error: any) {
        return error.response?.data?.message || "Erro ao buscar usuário";
    }
}

export async function updateOffer(token: string, { offer }: { offer: FoodUpdateProps }) {
    try {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        const { data } = await api.patch(`/foods/${offer.id}`, offer);
        return data;
    } catch (error: any) {
        return error.response?.data?.message || "Erro ao atualizar oferta";
    }
}

export async function addOffer(token: string, { offer }: { offer: FoodProps }) {
    try {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        const { data } = await api.post("/foods", offer);
        return data;
    } catch (error: any) {
        return error.response?.data?.message || "Erro ao criar oferta";
    }
}

export async function deleteOffer(token: string, id: number) {
    try {
        api.defaults.headers["Authorization"] = `Bearer ${token}`;
        await api.delete(`/foods/${id}`);
        return true;
    } catch (error: any) {
        return error.response?.data?.message || "Erro ao deletar oferta";
    }
}
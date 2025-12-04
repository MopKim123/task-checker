import axios from "axios"
import type { AuthResponse, LoginRequest, LoginResponse } from "../types/auth"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function loginUser(user: LoginRequest): Promise<LoginResponse> {
    try {
        const res = await axios.post<LoginResponse>(
            `${API_BASE_URL}/auth/login`,
            user,
            {
                withCredentials: true, 
            }
        )
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed")
    }
}

export async function registerUser(user: LoginRequest): Promise<void> {
    try {
        await axios.post<LoginResponse>(
            `${API_BASE_URL}/auth/register`,
            user,
            {
                withCredentials: true, 
            }
        ) 
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Register failed")
    }
}

export async function searchUser(user: string): Promise<AuthResponse[]> {
    try {
        const res = await axios.get<AuthResponse[]>(
            `${API_BASE_URL}/auth/search`,
            {
                params: { username: user },
                withCredentials: true,
            }
        )
        return res.data
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Search failed")
    }
}

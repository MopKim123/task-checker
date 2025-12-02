import type { LoginRequest, LoginResponse } from "../types/auth"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function loginUser(user: LoginRequest): Promise<LoginResponse> { 
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
    })
    
    if (!res.ok) throw new Error("Login failed")
    const json = await res.json()  


    return json
}
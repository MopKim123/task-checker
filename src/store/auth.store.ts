import { defineStore } from 'pinia' 
import { loginUser } from '../services/auth'
import type { LoginRequest, LoginResponse } from '../types/auth'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        username: '', 
    }),

    actions: {
        clear() {
            this.username = ''
        },  
        setUser(user: LoginResponse) {
            this.username = user.username
            localStorage.setItem("username", user.username) 
            localStorage.setItem("userId", user.id.toString())
        }, 
        async login(user: LoginRequest) { 
            try {   
                const data = await loginUser(user);    
                this.setUser(data)    
                console.log("user",data)                 
            } catch (err) {
                // toast.error(`User not found! ${err}`) 
            }
        },  
    }
})

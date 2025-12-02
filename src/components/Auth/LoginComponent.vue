<template>
    <!-- Backdrop always rendered -->
    <div class="modal-backdrop show"> 
        <div class="modal">
            <h2>Login</h2>
            <input v-model="request.username" placeholder="Username..." required/>
            <input v-model="request.password" type="password" placeholder="Password..." required/> 
            <span>No account yet? <b @click="register">Register</b></span>
            <div class="buttons">
                <button @click="login">Login</button> 
            </div>
        </div> 
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'  
import type { LoginRequest } from '../../types/auth'
import { useAuthStore } from '../../store/auth.store'
import router from '../../router'
  

const request = ref({} as LoginRequest) 

async function login() {  
    const authStore = useAuthStore() 

    try { 
        await authStore.login(request.value)
        // toast.success("Student updated successfully!",)
        request.value = {} as LoginRequest 
        router.push('/home')
    } catch (error) { 
        alert(error)
        // toast.error("Something went wrong!")
    } 
}

function register() { 
    console.log("Register")
}
  
</script>

<style scoped>

.modal{
    background-color: #242424; 
    border: 1px solid white;
    padding: 5vh;
    width: 20vw;
    border-radius: 2vh;
    display: flex;
    flex-direction: column;
}

input{
    margin-bottom: 1rem;
    padding: 1vh;
    border-radius: 5px;
    border: 1px solid white;
} 
h2{
    color: white;
}

.buttons{ 
    display: flex;
    justify-content: space-around;
    margin-top: 1.5vh;
}

button{
    background-color: #242424; 
    color: rgb(255, 255, 255);
    border: 1px solid white;
}
button:hover{
    background-color: #444444; 
}
button:active{
    background-color: #242424; 
}

.modal-backdrop {   
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.modal-backdrop.show {
  opacity: 1;
  pointer-events: all;
} 
</style>

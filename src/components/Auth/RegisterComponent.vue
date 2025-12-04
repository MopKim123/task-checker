<template>
    <!-- Backdrop always rendered -->
    <div class="modal-backdrop show"> 
        <div class="modal">
            <h2>Register</h2>
            <input v-model="request.username" placeholder="Username..." required/>
            <input v-model="request.password" type="password" placeholder="Password..." required/> 
            <div class="buttons">
                <button @click="router.push('/')">Login</button> 
                <button @click="register">Signup</button> 
            </div>
        </div> 
    </div>
</template>


<script lang="ts" setup>
import { ref } from 'vue'  
import type { LoginRequest } from '../../types/auth' 
import router from '../../router' 
import { registerUser } from '../../services/auth'

const request = ref({} as LoginRequest)  

function register() { 
    const value = request.value
    if(value.password && value.username){
        registerUser(value)
        router.push('/')
    }
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

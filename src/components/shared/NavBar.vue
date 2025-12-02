<template>
  <div class="navbar">
    <div class="app-name" style="cursor: pointer;">
      <img src="../../assets/checked.png" class="icon" />
      <h2>TaskChecker</h2>
    </div>
    <div class="auth">

    <h3 v-show="!username">Register</h3> 
    </div>
    <div class="app-username" v-show="username">
      <h3 @click="toggleMenu" class="username">{{ username }}</h3>

      <div class="dropdown" v-show="showMenu">  
        <span @click="logout">Log out</span>
      </div>
    </div> 
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue' 
import router from '../../router'; 
import { useAuthStore } from '../../store/auth.store';
 
const username = ref<string | null>(null);
const showMenu = ref(false);
const authStore = useAuthStore()


onMounted(async () => {
  username.value = localStorage.getItem("username")
});

function toggleMenu() {
  showMenu.value = !showMenu.value;
} 

function logout() {
  localStorage.removeItem("username") 
  authStore.clear()

  showMenu.value = false
  username.value = null
  router.push("/")
} 
</script>

<style scoped>
.auth{
  display: flex;
  flex-direction: row;
}
.navbar { 
  width: 100vw;
  height: 8vh;  
  position: sticky;
  top: 0;
  border-bottom: 1px solid gray;
  /* background-color: #242400; */
  background-color: #242424;
  display: flex; 
  justify-content: space-between;
  align-items: center;   
  z-index: 100; 
}

.app-name {
    display: flex;
    flex-direction: row; 
    align-items: center;
    gap: 0.5rem;  
    margin-left: 1vw;   
}

.icon {
    height: 2.8vw;
    width: 2.8vw;
}
h2 {
    color: white;
    margin: 0;                /* remove default margin */
    font-size: 1.5rem;
}

h3{
  margin-right: 1vw;
  cursor: pointer;
}

.app-username {
    position: relative;
    cursor: pointer;
} 

.dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    background: #2c2c2c;
    border: 1px solid #444;
    border-radius: 6px;
    padding: 0.5rem 0;
    display: flex;
    flex-direction: column;
    min-width: 150px;
    z-index: 10;
}

.dropdown span {
    padding: 0.5rem 1rem;
    cursor: pointer;
}

.dropdown span:hover {
    background: #444;
}

</style>

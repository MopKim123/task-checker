<template>
    <!-- Backdrop always rendered -->
    <div class="modal-backdrop" :class="{ 'show': visible }" @click.self="close">
        <transition name="slide">
        <div class="modal" v-if="visible">
            <h2>Create Task</h2> 
            <input v-model="newTask.title" placeholder="Title" required/> 
            <textarea v-model="newTask.description" name="" id=""></textarea> 
            <select v-model="newTask.status" required>
                <option value="" disabled>Select Status</option>
                <option 
                    v-for="status in taskStore.status" 
                    :key="status" 
                    :value="status">
                    {{ status }} 
                </option>
            </select>
            <select v-model="newTask.assignedTo" required>
                <option value="" disabled>Assign to</option>
                <option 
                    v-for="member in taskStore.members" 
                    :key="member.id" 
                    :value="member.id">
                    {{ member.user.username }} 
                </option>
            </select> 
            <div class="buttons">
                <button @click=" ">Add</button>
                <button @click="close">Cancel</button>
            </div>
        </div>
        </transition>
    </div>
</template>


<script lang="ts" setup>
import { defineProps, defineEmits, ref} from 'vue'  
import { useTaskStore } from '../../../store/tasks.store'; 
import type { TaskRequest } from '../../../types/task';

defineProps<{ 
    // selectedAsset: CryptoResponse 
    // portfolios: PortfolioResponse[] 
    visible: boolean 
}>()

const emit = defineEmits<{ 
    (e: 'close'): void
}>()

const taskStore = useTaskStore()
const newTask = ref({} as TaskRequest)
  

// async function add(asset: CryptoResponse) {  
//     newHolding.value.assetSymbol = asset.symbol  

//     try { 
//         if(newHolding.value.amount && newHolding.value.portfolioId){
//             addHoldings(newHolding.value) 
//             newHolding.value = {} as HoldingRequest
//             emit('close')
//         } else { console.log("not added") }
//     } catch (error) { 
//         alert(error)
//         // toast.error("Something went wrong!")
//     } 
// }

function close() {
    emit('close')
} 
</script>

<style scoped>

.modal{
    background-color: #242424; 
    border: 1px solid white;
    padding: 5vh;
    width: 20vw;
    border-radius: 2vh;
}

input, select{
    padding: 1vh;
    border-radius: 5px;
    border: 1px solid white;
} 
input{ 
    width: 70%;
    margin-bottom: 1rem;
}
select{ 
    width: 75%;
    margin: 1vh 0;
}
textarea{ 
    max-width: 73%;
    min-width: 73%;
    margin: 1vh 0; 
}
h2{
    color: white;
}
h3, h4{
    text-align: left;
}
h4{
    margin: .5vh 1vw;
}

.buttons{ 
    display: flex;
    justify-content: space-around;
    margin-top: 1vh;
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
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(124, 124, 124, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 100;
}

.modal-backdrop.show {
  opacity: 1;
  pointer-events: all;
}

/* Slide animation for modal */
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from { opacity: 0; transform: translateY(-10%); }
.slide-enter-to { opacity: 1; transform: translateY(0); }
.slide-leave-from { opacity: 1; transform: translateY(0); }
.slide-leave-to { opacity: 0; transform: translateY(-10%); }
</style>

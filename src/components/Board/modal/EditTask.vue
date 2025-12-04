<template>
    <!-- Backdrop always rendered -->
    <div class="modal-backdrop" :class="{ 'show': visible }" @click.self="close">
        <transition name="slide">
        <div class="modal" v-if="visible">
            <h2>Edit Task</h2> 
            <input v-model="localTask.title" placeholder="Title" required/> 
            <textarea v-model="localTask.description" name="" id="" required></textarea> 
            <select v-model="localTask.status" required>
                <option value="" disabled>Select Status</option>
                <option 
                    v-for="status in taskStore.status" 
                    :key="status" 
                    :value="status">
                    {{ status }} 
                </option>
            </select> 
            <div class="buttons">
                <button @click="update">Create</button>
                <button @click="close">Cancel</button>
            </div>
        </div>
        </transition>
    </div>
</template>


<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch} from 'vue'  
import { useTaskStore } from '../../../store/tasks.store'; 
import type { TaskEditRequest, TaskResponse } from '../../../types/task';
import { useEventTypeStore } from '../../../store/eventType.store';
import { sendEvent } from '../../../services/websocket';
import { useBoardStore } from '../../../store/boards.store';

const props = defineProps<{  
    selectedTask: TaskResponse 
    visible: boolean 
}>()

const localTask = ref<TaskEditRequest>({
    id: props.selectedTask.id,
    title: props.selectedTask.title,
    status: props.selectedTask.status,
    description: props.selectedTask.description,
    assignedTo: props.selectedTask.assignedTo?.id // number, not User
});
watch(
    () => props.selectedTask,
    (newTask) => {
        if (!newTask) return;
        localTask.value = {
            id: newTask.id,
            title: newTask.title,
            status: newTask.status,
            description: newTask.description,
            assignedTo: newTask.assignedTo?.id
        };
    },
    { immediate: true }
);



const emit = defineEmits<{ 
    (e: 'close'): void
}>()

const taskStore = useTaskStore()
const boardStore = useBoardStore()
const eventType = useEventTypeStore() 


function close() {
    emit('close')
} 

function update() {
    const type = eventType.TASK_UPDATED
    const boardId = boardStore.current.id
    const data = localTask.value
    const message = {type, boardId, data} 
    sendEvent(message) 
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
    font-size: .9rem;
    min-height: 6vh;
    border: 1px solid white;
    border-radius: 5px;
}
h2{
    color: white;
    margin-top: 0;
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

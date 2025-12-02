import { defineStore } from 'pinia' 
import type { BoardResponse } from '../types/board' 
import { getAllTasks } from '../services/task'
import type { TaskResponse } from '../types/task'

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as TaskResponse[],  
    }),

    actions: {
        clear() {
            this.tasks = []
        },  
        setTasks(tasks: TaskResponse[]) {
            this.tasks = tasks 
        }, 
        async getTasks(id: number) { 
            try {   
                const data = await getAllTasks(id);    
                this.setTasks(data)    
                console.log(data)               
            } catch (err) {
                // toast.error(`User not found! ${err}`) 
            }
        },  
    }
})

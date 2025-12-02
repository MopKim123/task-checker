import { defineStore } from 'pinia' 
import type { BoardResponse } from '../types/board'
import { getAllBoards } from '../services/board'

export const useBoardStore = defineStore('board', {
    state: () => ({
        boards: [] as BoardResponse[], 
        current: {} as BoardResponse, 
    }),

    actions: {
        clear() {
            this.boards = []
        },  
        setBoards(boards: BoardResponse[]) {
            this.boards = boards 
        }, 
        async getBoards(id: number) { 
            try {   
                const data = await getAllBoards(id);    
                this.setBoards(data)                   
            } catch (err) {
                // toast.error(`User not found! ${err}`) 
            }
        },  
    }
})

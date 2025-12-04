import { defineStore } from 'pinia' 
import type { BoardResponse } from '../types/board'
import { getAllBoards } from '../services/board' 
import { connectWS, onEvent, onOpen } from '../services/websocket'

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

        connectToBoard(boardId: number) {
            connectWS(boardId);

            onOpen(() => { 
                console.log(`WS connected: ${boardId}`);
            });
        },

        
        initBoardEvents() {
            
            onEvent("BOARD_CREATED", (msg) => {  
                this.boards.push(msg.data);  
                console.log(this.boards)
            });

            onEvent("BOARD_UPDATED", (msg) => {
                const updated = msg.data;
                console.log(updated)
                const idx = this.boards.findIndex(b => b.id === updated.id);

                if (idx !== -1) {
                    this.boards[idx] = updated;
                    this.current.name = updated.name
                }
            });

            onEvent("BOARD_DELETED", (msg) => {
                console.log("BOARD_DELETED",this.boards)
                const id = msg.data;
                this.boards = this.boards.filter(b => b.id !== id);
            }); 
        }
    }
})

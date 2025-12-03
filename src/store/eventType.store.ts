import { defineStore } from 'pinia'  
import type { WsEvent } from '../types/websocket'

export const useEventTypeStore = defineStore('eventType', {
    state: () => ({ 
        BOARD_CREATED: "BOARD_CREATED",
        BOARD_UPDATED: "BOARD_UPDATED",
        BOARD_DELETED: "BOARD_DELETED",

        MEMBER_ADDED: "MEMBER_ADDED",

        TASK_CREATED: "TASK_CREATED",
        TASK_UPDATED: "TASK_UPDATED",
        TASK_DELETED: "TASK_DELETED",

        COMMENT_ADDED: "COMMENT_ADDED",
    }),
    
        actions: { 
            // mapPayload(type: string, boardId: number, payload: any): WsEvent {
                
            //     return {type,boardId,payload} as WsEvent
            // },   
        }
})

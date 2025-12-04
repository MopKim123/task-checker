import { defineStore } from 'pinia'   

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
})

import { defineStore } from 'pinia'  
import { getAllComments, getAllTasks } from '../services/task'
import type { CommentResponse, TaskResponse } from '../types/task'
import type { Member } from '../types/member'
import { getAllMembers } from '../services/members'
import { onEvent } from '../services/websocket'

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as TaskResponse[],  
        members: [] as Member[],  
        comments: [] as CommentResponse[],  
        status: ['TO DO','URGENT','CANCELLED','DONE'],  
    }),

    actions: {
        clear() {
            this.tasks = []
            this.members = []
        },  
        setTasks(tasks: TaskResponse[]) {
            this.tasks = tasks 
        }, 
        setMembers(members: Member[]) {
            this.members = members 
        }, 
        setComments(comments: CommentResponse[]) {
            this.comments = comments 
        }, 
        async getTasks(id: number) { 
            try {   
                const members = await getAllMembers(id);    
                const tasks = await getAllTasks(id);   
                const tasksWithComments = await Promise.all(
                    tasks.map(task => getAllComments(task.id))
                );
                const allComments = tasksWithComments.flat();

                this.setTasks(tasks)    
                this.setMembers(members)                 
                this.setComments(allComments)                 
            } catch (err) {
                // toast.error(`User not found! ${err}`) 
            }
        },  

        initTaskEvents() {
            onEvent("TASK_CREATED", (msg) => {
                console.log("msg2",msg.data)
                this.tasks.push(msg.data);
            });

            onEvent("TASK_UPDATED", (msg) => {
                const updated = msg.payload;
                const idx = this.tasks.findIndex(t => t.id === updated.id);

                if (idx !== -1) {
                    this.tasks[idx] = updated;
                }
            });

            onEvent("TASK_DELETED", (msg) => {
                const id = msg.payload;
                this.tasks = this.tasks.filter(t => t.id !== id);
            });

            onEvent("COMMENT_ADDED", (msg) => {
                const { taskId, comment } = msg.payload;

                const task = this.tasks.find(t => t.id === taskId);
                if (task) {
                    this.comments.push(comment);
                }
            });

            onEvent("MEMBER_ADDED", (msg) => {
                const { boardId, member } = msg.payload;
                this.members.push(member);
            });
        }
    }
})

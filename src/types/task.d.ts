import type { User } from "./auth"

export interface TaskSimpleResponse {
  id: number 
} 
export interface TaskSimpleRequest {
  id: number 
} 
export interface TaskResponse {
  id: number
  title: string
  status: string
  description: string
  assignedTo: User 
} 

export interface TaskRequest { 
  title: string 
  status: string
  description: string
  assignedTo: User 
} 

export interface TaskEditRequest { 
  id: number
  title: string 
  status: string
  description: string
  assignedTo: number 
} 

export interface CommentRequest { 
  taskId: number
  message: string 
  authorId: number 
} 

export interface CommentResponse { 
  id: number
  message: string 
  createdAt: string
  task: TaskSimpleResponse
  author: User 
} 

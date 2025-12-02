import axios from "axios"; 
import type { TaskResponse } from "../types/task";

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getAllTasks(boardId: number): Promise<TaskResponse[]> {
    try {
        const response = await axios.get<TaskResponse[]>(`${API_BASE_URL}/boards/${boardId}/tasks`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        throw new Error("fetch failed");
    }
}
import axios from "axios";  
import type { Member } from "../types/member";

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getAllMembers(boardId: number): Promise<Member[]> {
    try {
        const response = await axios.get<Member[]>(`${API_BASE_URL}/boards/${boardId}/members`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        throw new Error("fetch failed");
    }
}

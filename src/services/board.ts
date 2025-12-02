import axios from "axios";
import type { BoardResponse } from "../types/board"

const API_BASE_URL = import.meta.env.VITE_API_URL

export async function getAllBoards(id: number): Promise<BoardResponse[]> {
    try {
        const response = await axios.get<BoardResponse[]>(`${API_BASE_URL}/boards/owner/${id}`, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        throw new Error("fetch failed");
    }
}
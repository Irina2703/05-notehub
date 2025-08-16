import axios from "axios";
import type { Note } from "../types/note";

const NOTEHUB_KEY = import.meta.env.VITE_NOTEHUB_KEY;
const LINK = 'https://notehub-public.goit.study/api/notes';

export interface NoteResponse {
    notes: Note[];
    totalPages: number;
}

export async function fetchNotes (page: number, userQuery: string): Promise<NoteResponse> {
    
    const response = await axios.get<NoteResponse>(LINK,
        {
            params: {
                search: userQuery,
                page: page,
                perPage: 12,
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${NOTEHUB_KEY}`,
            }
        });
    return response.data;
}

// export async function createNote() {
    
// }

// export async function deleteNote () {}
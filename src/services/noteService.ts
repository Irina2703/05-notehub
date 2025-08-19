// src/services/noteService.ts

import axios from 'axios';
import type { Note } from '../types/note';


const API_URL = 'https://notehub-public.goit.study/api/notes';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;


const headers = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
};

export const fetchNotes = async (page = 1, perPage = 12, sortBy?: string, tag?: string) => {
    const params: Record<string, string | number> = {
        page,
        perPage,
    };

    if (sortBy) params.sortBy = sortBy;
    if (tag) params.tag = tag;

    const { data } = await axios.get<{ notes: Note[] }>(API_URL, { headers, params });
    return data.notes;
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data } = await axios.post<Note>(API_URL, note, { headers });
    return data;
};

export const deleteNote = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`, { headers });
};

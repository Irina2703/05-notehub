import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api/notes';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
});

export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
    tag?: NoteTag;
    sortBy?: string;
}

export const fetchNotes = async (params?: FetchNotesParams): Promise<Note[]> => {
    const response = await axiosInstance.get<Note[]>('', { params });
    return response.data;
};

export const createNote = async (data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
    const response = await axiosInstance.post<Note>('', data);
    return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axiosInstance.delete<Note>(`/${id}`);
    return response.data;
};

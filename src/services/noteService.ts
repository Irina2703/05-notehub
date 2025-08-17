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
}

export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
    totalNotes: number;
}

export interface CreateNoteParams {
    title: string;
    content: string;
    tag: NoteTag;
}

export interface CreateNoteResponse {
    note: Note;
}

export interface DeleteNoteResponse {
    note: Note;
}

export const fetchNotes = async (
    params: FetchNotesParams
): Promise<FetchNotesResponse> => {
    const response = await axiosInstance.get<FetchNotesResponse>('', { params });
    return response.data;
};

export const createNote = async (
    data: CreateNoteParams
): Promise<CreateNoteResponse> => {
    const response = await axiosInstance.post<CreateNoteResponse>('', data);
    return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
    const response = await axiosInstance.delete<DeleteNoteResponse>(`/${id}`);
    return response.data;
};

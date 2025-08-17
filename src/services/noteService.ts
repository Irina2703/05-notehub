import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { type Note, type NoteTag } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api/notehttps://notehub-public.goit.study/api/auths';

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
    const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('', {
        params,
    });
    return response.data;
};

export const createNote = async (
    data: CreateNoteParams
): Promise<CreateNoteResponse> => {
    const response: AxiosResponse<CreateNoteResponse> = await axiosInstance.post('', data);
    return response.data;
};

export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
    const response: AxiosResponse<DeleteNoteResponse> = await axiosInstance.delete(`/${id}`);
    return response.data;
};

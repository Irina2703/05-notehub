import axios, { type AxiosResponse } from 'axios';
import { type Note, type NoteTag } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api/notes';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
});

// Параметры для запроса списка заметок
export interface FetchNotesParams {
    page?: number;
    perPage?: number;
    search?: string;
}

// Ответ от API при получении списка заметок
export interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
    totalNotes: number;
}

// Параметры для создания новой заметки
export interface CreateNoteParams {
    title: string;
    content: string;
    tag: NoteTag;
}

// Ответ при создании заметки
export interface CreateNoteResponse {
    note: Note;
}

// Ответ при удалении заметки
export interface DeleteNoteResponse {
    note: Note;
}

// Получение списка заметок с возможностью пагинации и поиска
export const fetchNotes = async (
    params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
    try {
        const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
};

// Создание новой заметки
export const createNote = async (
    data: CreateNoteParams
): Promise<CreateNoteResponse> => {
    try {
        const response: AxiosResponse<CreateNoteResponse> = await axiosInstance.post('', data);
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
};

// Удаление заметки по ID
export const deleteNote = async (id: string): Promise<DeleteNoteResponse> => {
    try {
        const response: AxiosResponse<DeleteNoteResponse> = await axiosInstance.delete(`/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting note:', error);
        throw error;
    }
};

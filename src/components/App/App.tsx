import React, { useState } from "react";
import { useQuery } from "react-query";
import NoteForm from '../NoteForm/NoteForm';
import Pagination from '../Pagination/Pagination';

interface Note {
    id: number;
    title: string;
    content: string;
}

interface NotesResponse {
    notes: Note[];
    totalPages: number;
}

// Функция для получения заметок с сервера
const fetchNotes = async (page: number): Promise<NotesResponse> => {
    const res = await fetch(`/api/notes?page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch notes");
    return res.json();
};

const App: React.FC = () => {
    const [page, setPage] = useState(1);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const { data, isLoading, error } = useQuery<NotesResponse>(
        ["notes", page],
        () => fetchNotes(page),
        { keepPreviousData: true }
    );

    const handleCloseForm = () => setIsFormOpen(false);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading notes</div>;

    return (
        <div>
            <button onClick={() => setIsFormOpen(true)}>Add Note</button>

            {isFormOpen && <NoteForm onClose={handleCloseForm} />}

            <ul>
                {data?.notes.map((note) => (
                    <li key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                    </li>
                ))}
            </ul>

            {data && (
                <Pagination
                    currentPage={page}
                    onPageChange={setPage}
                    totalPages={data.totalPages}
                />
            )}
        </div>
    );
};

export default App;

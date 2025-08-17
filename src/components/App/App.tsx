import { useState } from "react";
import css from "./App.module.css";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import Loader from "../Loader/Loader";

export default function App() {
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["notes", page, debouncedSearch],
        queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch }),
        placeholderData: keepPreviousData,
    });

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setPage(1);
    };

    const handleNoteCreated = () => setIsModalOpen(false);

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox value={search} onChange={handleSearchChange} />
                {data && data.totalPages > 1 && (
                    <Pagination page={page} setPage={setPage} totalPages={data.totalPages} />
                )}
                <button className={css.button} onClick={() => setIsModalOpen(true)}>
                    Create note +
                </button>
            </header>

            {isLoading && <Loader />}
            {isError && <p>Error loading...</p>}

            {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <NoteForm onSuccess={handleNoteCreated} />
                </Modal>
            )}
        </div>
    );
}

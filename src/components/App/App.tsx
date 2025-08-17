import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { fetchNotes, FetchNotesResponse } from "../../services/noteService";

export default function App() {
    const [searchText, setSearchText] = useState("");
    const [debouncedText] = useDebounce(searchText, 500);

    const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
        queryKey: ["notes", debouncedText],
        queryFn: () =>
            fetchNotes({
                page: 1,
                perPage: 12,
                search: debouncedText.trim() || undefined,
            }),
    });

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox searchText={searchText} onUpdate={setSearchText} />
            </header>

            <main>
                {isLoading && <p>Loading notes...</p>}
                {isError && <p>Something went wrong while fetching notes.</p>}
                {data && data.results.length > 0 ? (
                    <ul>
                        {data.results.map((note) => (
                            <li key={note.id}>
                                <strong>{note.title}</strong> – {note.tag}
                            </li>
                        ))}
                    </ul>
                ) : (
                    !isLoading && <p>No notes found</p>
                )}
            </main>
        </div>
    );
}

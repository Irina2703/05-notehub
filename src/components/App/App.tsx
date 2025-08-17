// Make sure the path is correct and the file exists
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/movieService';

export default function App() {
    const [searchText, setSearchText] = useState('');
    const [debouncedText] = useDebounce(searchText, 500);

    useEffect(() => {
        if (debouncedText.trim() !== '') {
            fetchNotes(1, debouncedText).then(data => {
                console.log(data);
            });
        }
    }, [debouncedText]);
    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox searchText={searchText} onUpdate={setSearchText} />
                {/* Пагінація */}
                {/* Кнопка створення нотатки */}
            </header>
        </div>
    );
}
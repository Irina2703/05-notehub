import { useState } from 'react';

import NoteForm from '../NoteForm/NoteForm';
import Pagination from '../Pagination/Pagination';

export default function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);

    const totalPages = 5; // пример, можно получать из API

    const handleFormClose = () => {
        setShowForm(false);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        console.log('Note successfully created!');
        // здесь можно делать рефреш списка заметок
    };

    return (
        <div>
            <h1>NoteHub</h1>

            <button onClick={() => setShowForm(true)}>Create Note</button>

            {showForm && (
                <NoteForm
                    onClose={handleFormClose}   // безопасно закрываем форму
                    onSuccess={handleFormSuccess} // вызываем после успешного создания
                />
            )}

            {/* Здесь будет список заметок */}
            <div>Список заметок...</div>

            {/* Пагинация */}
            <Pagination
                page={currentPage}        // текущая страница
                setPage={setCurrentPage}  // функция для смены страницы
                totalPages={totalPages}   // общее количество страниц
            />
        </div>
    );
}

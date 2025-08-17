// src/components/NoteForm/NoteForm.tsx
import React, { useState } from 'react';
import { type NoteTag } from '../../types/note';

export interface NoteFormProps {
    onClose: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tag, setTag] = useState<NoteTag>('Todo');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // логіка створення нотатки
        console.log({ title, content, tag });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Content"
            />
            <select value={tag} onChange={(e) => setTag(e.target.value as NoteTag)}>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
            </select>
            <button type="submit">Create Note</button>
            <button type="button" onClick={onClose}>Close</button>
        </form>
    );
};

export default NoteForm;

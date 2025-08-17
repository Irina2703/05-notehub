import css from "./NoteForm.module.css";
import React from "react";

interface NoteFormProps {
    onSuccess: () => void;
}

export default function NoteForm({ onSuccess }: NoteFormProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Здесь логика создания заметки
        // После успешного создания:
        onSuccess();
    };

    return (
        <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input id="title" type="text" name="title" className={css.input} />
                <span className={css.error} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                />
                <span className={css.error} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select id="tag" name="tag" className={css.select}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
                <span className={css.error} />
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton}>
                    Cancel
                </button>
                <button type="submit" className={css.submitButton} disabled={false}>
                    Create note
                </button>
            </div>
        </form>
    );
}
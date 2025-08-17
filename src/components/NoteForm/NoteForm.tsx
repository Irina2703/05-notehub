import css from "./NoteForm.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../services/noteService";
import type { Note, NoteTag } from "../../types/note";

interface NoteFormProps {
    onClose: () => void;
}

interface NoteFormValues {
    title: string;
    content: string;
    tag: NoteTag;
}

export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation<Note, Error, NoteFormValues>({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onClose();
        },
    });

    const formik = useFormik<NoteFormValues>({
        initialValues: {
            title: "",
            content: "",
            tag: "general",
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(50, "Слишком длинный заголовок")
                .required("Обязательное поле"),
            content: Yup.string()
                .required("Обязательное поле"),
            tag: Yup.string()
                .required("Обязательное поле"),
        }),
        onSubmit: (values) => {
            mutation.mutate(values);
        },
    });

    return (
        <form className={css.form} onSubmit={formik.handleSubmit}>
            <div className={css.field}>
                <label htmlFor="title">Заголовок</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                    <div className={css.error}>{formik.errors.title}</div>
                ) : null}
            </div>

            <div className={css.field}>
                <label htmlFor="content">Содержание</label>
                <textarea
                    id="content"
                    name="content"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.content}
                />
                {formik.touched.content && formik.errors.content ? (
                    <div className={css.error}>{formik.errors.content}</div>
                ) : null}
            </div>

            <div className={css.field}>
                <label htmlFor="tag">Тег</label>
                <select
                    id="tag"
                    name="tag"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.tag}
                >
                    <option value="general">General</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                </select>
                {formik.touched.tag && formik.errors.tag ? (
                    <div className={css.error}>{formik.errors.tag}</div>
                ) : null}
            </div>

            <div className={css.actions}>
                <button type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Сохраняем..." : "Сохранить"}
                </button>
                <button type="button" onClick={onClose}>Отмена</button>
            </div>
        </form>
    );
}

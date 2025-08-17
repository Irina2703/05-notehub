import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    totalPages: number;
}

export default function Pagination({ currentPage, onPageChange, totalPages }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <ReactPaginate
            pageCount={totalPages}
            forcePage={currentPage - 1}
            onPageChange={(selected) => onPageChange(selected.selected + 1)}
            containerClassName={css.pagination}
            activeClassName={css.active}
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
        />
    );
}

// src/components/Pagination/Pagination.tsx
import React from 'react';

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    return (
        <div>
            <button onClick={handlePrev} disabled={currentPage === 1}>Prev</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

export default Pagination;

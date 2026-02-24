import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center items-center space-x-4 mt-8">
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-md bg-white disabled:opacity-50"
            >
                Previous
            </button>
            {pageNumbers.map(number => (
                <button 
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-4 py-2 border rounded-md ${currentPage === number ? 'bg-blue-600 text-white' : 'bg-white'}`}
                >
                    {number}
                </button>
            ))}
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-md bg-white disabled:opacity-50"
            >
                Next
            </button>
        </nav>
    );
}

export default Pagination;

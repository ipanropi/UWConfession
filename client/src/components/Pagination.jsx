import React from 'react';

const Pagination = ({setCurrentPage, currentPage, setStartIndex, length}) => {

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
        setStartIndex((currentPage) * 6);
    }

    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
        setStartIndex((currentPage - 2) * 6);
    }

    return (
        <div className="flex items-center justify-center gap-8 pt-8">

            {currentPage !== 1 ? (
                <button onClick={handlePrevious}
                        className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
           aria-hidden="true" className="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
      </svg>
    </span>
                </button>
            ) : (
                <button disabled
                        className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button">
    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
           aria-hidden="true" className="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
      </svg>
    </span>
                </button>
            )}


            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                Page <strong className="text-gray-900">{currentPage}</strong> of <strong
                className="text-gray-900">{length}</strong>
            </p>

            {currentPage !== length ? (
                <button onClick={handleNext}
                    className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
           aria-hidden="true" className="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
      </svg>
    </span>
                </button>
            ) : (
                <button disabled
                    className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border border-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button">
    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
           aria-hidden="true" className="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
      </svg>
    </span>
                </button>
            )}

        </div>
    );
};

export default Pagination;
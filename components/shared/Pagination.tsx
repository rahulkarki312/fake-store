"use client";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`cursor-pointer px-2 rounded-full border ${
              currentPage === pageNumber
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}
    </div>
  );
}
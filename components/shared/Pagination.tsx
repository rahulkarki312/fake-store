"use client";

import { useRouter, useSearchParams } from "next/navigation";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => updatePage(pageNumber)}
            className={`cursor-pointer px-2 rounded-full border  ${
              currentPage === pageNumber
                ? "bg-black  text-white"
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
"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface SortControlsProps {
  currentSort?: "asc" | "desc";
}

export default function SortControls({ currentSort }: SortControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSort = (sort: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("page", "1"); // reset page when sort changes
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => updateSort("asc")}
        className={`cursor-pointer px-4 py-2.5 border rounded-md text-sm ${currentSort === "asc" ? "bg-black text-white" : "hover:bg-gray-100"}`}
      >
        Sort Asc
      </button>

      <button
        onClick={() => updateSort("desc")}
        className={`cursor-pointer px-4 py-2.5 border rounded-md text-sm ${currentSort === "desc" ? "bg-black text-white" : "hover:bg-gray-100"}`}
      >
        Sort Desc
      </button>
    </div>
  );
}
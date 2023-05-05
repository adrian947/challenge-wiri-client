import { useEffect, useState } from "react";

export const usePagination = (items) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const currentItems = items.slice(start, end);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  function nextPage() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  }

  function prevPage() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function goToPage(page) {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  }

  return {
    currentPage,
    currentItems,
    totalPages,
    nextPage,
    prevPage,
    goToPage,
  };
};

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import useSearchPagination from "../hooks/useSearchPagination";
import { cn } from "@/lib/utils";

function SearchPagination({ totalItems, className, limit }) {
  
  const { currentPage, onPageChange, paginationConfig } = useSearchPagination(
    totalItems,
    limit
  );

  return (
    <Pagination className={cn("justify-center", className)}>
      <PaginationContent>
        {paginationConfig.totalPages ? (
          <PaginationPrevious
            className="h-8 text-xs"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage <= 1}
          />
        ) : null}
        {paginationConfig.paginationLinks}
        {paginationConfig.totalPages ? (
          <PaginationNext
            className="h-8 text-xs"
            onClick={() =>
              onPageChange(
                Math.min(currentPage + 1, paginationConfig.totalPages)
              )
            }
            disabled={currentPage >= paginationConfig.totalPages}
          />
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}

export default SearchPagination;

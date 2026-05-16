import generatePaginationLinks from "@/components/ui/generate-pagination";
import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

const DEFAULT_PAGE = 1;
function useSearchPagination(totalItems, limit) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage =
    Number(searchParams.get(SEARCH_PARAMS_KEYS.PAGE)) || DEFAULT_PAGE;

  const onPageChange = useCallback((page) => {
    searchParams.set(SEARCH_PARAMS_KEYS.PAGE, page);
    setSearchParams(searchParams);
  });
  [searchParams];

  const paginationConfig = useMemo(() => {
    const totalPages = Math.ceil(totalItems / limit);
    return {
      paginationLinks: generatePaginationLinks(
        currentPage,
        totalPages,
        onPageChange,
        "w-8 h-8 text-xs"
      ),
      totalPages,
    };
  }, [totalItems, onPageChange]);

  return {
    currentPage,
    onPageChange,
    paginationConfig,
  };
}

export default useSearchPagination;

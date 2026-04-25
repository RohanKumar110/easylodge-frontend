import React from "react";
import Filter from "./filter";
import SortFilter from "./filter/components/sort-filter";
import SearchedHotels from "./hotels";
import PaginationFilter from "./filter/components/pagination-filter";

function SearchPage() {
  return (
    <div className="container flex gap-4 mt-6 mb-10">
      <Filter />
      <section className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Jaipur - 858 Properties Found</h1>
          <SortFilter />
        </div>
        <SearchedHotels />
        <PaginationFilter />
      </section>
    </div>
  );
}

export default SearchPage;

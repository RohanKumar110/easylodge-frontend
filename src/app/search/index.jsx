import React from "react";
import Filter from "./filter";
import SortFilter from "./filter/components/sort-filter";
import SearchedHotels from "./hotels";
import PaginationFilter from "./filter/components/pagination-filter";
import useFetchHotels from "./hotels/hooks/useFetchHotels";

function SearchPage() {
  const { data, city, isLoading, error } = useFetchHotels();

  const hotels = data?.content || [];

  return (
    <div className="container flex gap-4 mt-6 mb-10">
      <Filter />
      <section className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            {city} - {data?.totalItems} Properties Found
          </h1>
          <SortFilter />
        </div>
        <SearchedHotels isLoading={isLoading} hotels={hotels} error={error} />
        {hotels.length > 0 && <PaginationFilter />}
      </section>
    </div>
  );
}

export default SearchPage;

// city: "Miami",
// startDate: "2025-07-20",
// endDate: "2025-07-22",
// roomsCount: 1,
// pageNo: 0,
// pageSize: 10,

import React from "react";
import Filter from "./filter";
import SortFilter from "./filter/components/sort-filter";
import SearchedHotels from "./hotels";
import PaginationFilter from "./filter/components/pagination-filter";
import API_CONFIG from "@/config/api.config";
import useQuery from "@/lib/hooks/useQuery";

function SearchPage() {
  const { res, isLoading, error } = useQuery(API_CONFIG.HOTEL.BROWSE_HOTELS, {
    params: {
      city: "Miami",
      startDate: "2025-07-20",
      endDate: "2025-07-22",
      roomsCount: 1,
      pageNo: 0,
      pageSize: 5,
    },
  });

  const hotels = res?.data.content || [];

  return (
    <div className="container flex gap-4 mt-6 mb-10">
      <Filter />
      <section className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Jaipur - 858 Properties Found</h1>
          <SortFilter />
        </div>
        <SearchedHotels isLoading={isLoading} hotels={hotels} error={error} />
        {hotels.length > 0 && <PaginationFilter />}
      </section>
    </div>
  );
}

export default SearchPage;

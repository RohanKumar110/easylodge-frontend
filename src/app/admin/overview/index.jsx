import { useAdminContext } from "@/lib/providers/admin-context-provider";
import React from "react";
import HotelMetaInfo from "./hotel-meta-info";
import OverviewFilters from "./overview-filters";
import InsightSection from "./insight-section";
import { LoadingSpinner } from "@/components/ui/loader";

function Overview() {
  const { hotel, isLoading } = useAdminContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container p-4 max-w-384 space-y-8">
      <HotelMetaInfo
        name={hotel.name}
        address={hotel.address}
        image={hotel.images[0]}
        active={hotel.active}
      />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Overview</h2>
          <OverviewFilters />
        </div>
        <InsightSection />
      </section>
    </div>
  );
}

export default Overview;

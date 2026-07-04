import React from "react";
import { Separator } from "@/components/ui/separator";
import AddNewTraveller from "@/app/checkout/guests/add-new-traveller-dialog";
import CoTravellerInfo from "./co-traveller-info";
import { useTravellerContext } from "@/lib/providers/travellers-context-provider";
import { LoadingSpinner } from "@/components/ui/loader";

function TravellersManagement() {
  const { travellers, isLoading } = useTravellerContext();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h1 className="text-xl font-bold">Co-Travellers</h1>
          <p className="text-muted-foreground">
            Add, Remove or Update your travellers list
          </p>
        </div>
        <AddNewTraveller />
      </div>
      <Separator className="mt-4 mb-6" />
      <div>
        {!travellers || travellers?.length === 0 ? (
          <h1>No Travellers Found</h1>
        ) : (
          travellers.map((traveller) => (
            <CoTravellerInfo key={traveller.id} {...traveller} />
          ))
        )}
      </div>
    </section>
  );
}

export default TravellersManagement;

import API_CONFIG from "@/config/api.config";
import useQuery from "@/lib/hooks/useQuery";
import React from "react";
import EmptyHotels from "./empty-hotels";
import { LinkWithIcon } from "@/components/ui/link-with-icon";

function Hotels() {
  const { data, isLoading, error } = useQuery(
    API_CONFIG.ADMIN.GET_ADMIN_HOTELS
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      {data?.length === 0 ? (
        <EmptyHotels />
      ) : (
        <>
          <section className="flex items-center justify-between mt-8">
            <div>
              <h1 className="font-semibold text-2xl">
                Your Hotels: {data?.length}
              </h1>
              <p className="text-muted-foreground">
                Manage all your hotels in one place
              </p>
            </div>

            <LinkWithIcon
              to={"/admin/hotels/create"}
              icon="plus"
              size="sm"
              className="gap-1">
              Create Hotel
            </LinkWithIcon>
          </section>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 my-8">
            {[...data]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((hotel) => (
                <HotelCard key={hotel.id} {...hotel} />
              ))}
          </section>
        </>
      )}
    </div>
  );
}
function HotelCard({ id, name, active, images, address }) {
  return (
    <article className="overflow-hidden border rounded-xl">
      <div>
        <img
          height="200"
          className="object-cover w-full h-52"
          src={images[0]}
          alt={name}
        />
      </div>
      <div className="p-2 space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{name}</h2>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1
              ${active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              <span
                className={`w-1.5 h-1.5 rounded-full ${active ? "bg-green-500" : "bg-red-500"}`}
              />
              {active ? "Active" : "Inactive"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {address}
          </p>
        </div>
        <LinkWithIcon
          to={`/admin/hotels/${id}/overview`}
          icon="rightArrow"
          className="flex-row-reverse justify-center w-full rounded-full my-2">
          Go to Dashboard
        </LinkWithIcon>
      </div>
    </article>
  );
}

export default Hotels;

import React from "react";
import { TRENDING_DESTINATIONS } from "@/config/app.config";
import { getAssetPath } from "@/lib/utils";

function TrendingDestination() {
  return (
    <div className="container my-16">
      <div className="mb-4 space-y-1">
        <h2 className="text-2xl font-bold">Trending Destinations</h2>
        <p className="text-base text-muted-foreground">
          Most popular choices for travelers
        </p>
      </div>
      <div className="grid grid-cols-6 gap-4">
        {TRENDING_DESTINATIONS.map((destination, index) => (
          <div
            key={index}
            className={`h-67.5 rounded-lg overflow-hidden relative ${destination.className}`}>
            <img
              src={getAssetPath(destination.image)}
              title={destination.title}
              alt={`Pic of ${destination.title}`}
              className="object-cover size-full rounded-lg"
            />
            <div className="absolute from-70% to-100% inset-0 size-full bg-linear-to-t from-transparent to-blue-600/60">
              <div className="p-3">
                <h3 className="text-xl font-bold text-white">
                  {destination.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingDestination;

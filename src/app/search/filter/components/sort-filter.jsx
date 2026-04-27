import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SEARCH_FILTERS } from "@/config/app.config";
import React from "react";

function SortFilter() {
  return (
    <div>
      <Select>
        <SelectTrigger className="gap-2 rounded-full border border-border">
          <SelectValue placeholder="Select sort filter">
            <span>{SEARCH_FILTERS[0]}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {SEARCH_FILTERS.map((searchFilter) => (
            <SelectItem key={searchFilter.id}>{searchFilter.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SortFilter;

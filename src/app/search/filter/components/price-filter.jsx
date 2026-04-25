import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem } from "@/components/ui/form";
import { PRICE_FILTERS } from "@/config/app.config";
import React from "react";

function PriceFilter({ form }) {
  return (
    <div className="p-3 border-t border-border">
      <div className="mb-2">
        <h4 className="text-sm font-semibold">Price Per Night</h4>
      </div>
      <FormField
        control={form.control}
        name="priceRange"
        render={({ field }) => {
          const selectedValues = field.value || [];

          return (
            <FormItem className="space-y-1">
              {PRICE_FILTERS.map((star) => {
                const id = `star-${star.value}`;

                return (
                  <div key={star.id} className="flex items-center gap-2">
                    <Checkbox
                      id={id}
                      checked={selectedValues.includes(star.value)}
                      onCheckedChange={(checked) => {
                        const newValue = checked
                          ? [...selectedValues, star.value]
                          : selectedValues.filter((v) => v !== star.value);

                        field.onChange(newValue);
                      }}
                    />

                    <label htmlFor={id} className="text-sm cursor-pointer">
                      {star.label}
                    </label>
                  </div>
                );
              })}
            </FormItem>
          );
        }}
      />
    </div>
  );
}

export default PriceFilter;

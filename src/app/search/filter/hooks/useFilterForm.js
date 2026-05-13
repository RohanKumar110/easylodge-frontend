import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

function useFilterForm() {
  const [searchParams, setSearchParams] = useSearchParams();

  const form = useForm({
    defaultValues: {
      starCategory: searchParams
        .getAll(SEARCH_PARAMS_KEYS.STAR_CATEGORY)
        .map(Number),
      priceRange: searchParams.getAll(SEARCH_PARAMS_KEYS.PRICE_RANGE),
    },
  });

  function clearSearchParams() {
    searchParams.delete(SEARCH_PARAMS_KEYS.STAR_CATEGORY);
    searchParams.delete(SEARCH_PARAMS_KEYS.PRICE_RANGE);
    searchParams.delete(SEARCH_PARAMS_KEYS.PAGE);
  }

  function clearAllFilters() {
    form.reset({
      starCategory: [],
      priceRange: [],
    });
    clearSearchParams();
    setSearchParams(searchParams);
  }

  function handleFiltersChange() {
    const { starCategory, priceRange } = form.watch();
    clearSearchParams();
    starCategory.forEach((star) => {
      searchParams.append(SEARCH_PARAMS_KEYS.STAR_CATEGORY, star);
    });
    priceRange.forEach((price) => {
      searchParams.append(SEARCH_PARAMS_KEYS.PRICE_RANGE, price);
    });
    setSearchParams(searchParams);
  }

  return { form, handleFiltersChange, clearAllFilters };
}

export default useFilterForm;

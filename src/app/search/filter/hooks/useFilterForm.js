import { useForm } from "react-hook-form";

function useFilterForm() {
  const form = useForm({
    defaultValues: {
      starCategory: [],
      priceRange: "0-500",
    },
  });

  return { form };
}

export default useFilterForm;
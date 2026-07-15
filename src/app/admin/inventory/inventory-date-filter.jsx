import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";
import DateSelectInput from "@/features/search/date-select-input";
import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import dayjs from "dayjs";
import { toast } from "sonner";

function InventoryDateFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const checkIn = searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN);
  const checkOut = searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT);

  const form = useForm({
    defaultValues: {
      bookingDates: {
        from: checkIn ? dayjs(checkIn).toDate() : dayjs().format("YYYY-MM-DD"),
        to: checkOut
          ? dayjs(checkOut).toDate()
          : dayjs().add(1, "month").format("YYYY-MM-DD"),
      },
    },
  });

  function handleInventoryFormSubmit(values) {
    const { from, to } = values.bookingDates || {};

    if (!from || !to) {
      toast("Please select both Start date and End date", {
        type: "error",
      });
      return;
    }

    if (dayjs(to).isBefore(dayjs(from))) {
      toast("End date cannot be before Start date", {
        type: "error",
      });
      return;
    }

    searchParams.set(
      SEARCH_PARAMS_KEYS.CHECKIN,
      dayjs(from).format("YYYY-MM-DD")
    );
    searchParams.set(
      SEARCH_PARAMS_KEYS.CHECKOUT,
      dayjs(to).format("YYYY-MM-DD")
    );
    searchParams.set(SEARCH_PARAMS_KEYS.PAGE, 1);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleInventoryFormSubmit)}
          className="flex flex-col gap-2 max-w-100 pt-6 mb-4">
          <FormLabel className="text-sm">Select Date Range</FormLabel>
          <div className="flex flex-row items-center gap-4">
            <DateSelectInput
              form={form}
              className="border rounded-lg border-border w-auto! shrink-0"
            />
            <Button type="submit" className="h-12 w-30 cursor-pointer shrink-0">
              Apply
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default InventoryDateFilter;

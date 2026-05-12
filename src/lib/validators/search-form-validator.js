import dayjs from "dayjs";
import { z } from "zod";

export const searchFormSchema = z.object({
  city: z.string().min(1, "Please select a city"),

  bookingDates: z
    .object({
      from: z.date({
        required_error: "Check-in date is required",
      }),

      to: z.date({
        required_error: "Check-out date is required",
      }),
    })
    .refine((data) => !dayjs(data.from).isBefore(dayjs(), "day"), {
      message: "Check-in date cannot be in the past",
      path: ["from"],
    })
    .refine((data) => dayjs(data.to).isAfter(dayjs(data.from), "day"), {
      message: "Check-out date must be after check-in date",
      path: ["to"],
    }),

  roomsCount: z
    .number()
    .min(1, "At least 1 room is required")
    .max(10, "Maximum 10 rooms allowed"),
});

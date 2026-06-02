import dayjs from "dayjs";
import { z } from "zod";

export const travellerSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  dateOfBirth: z
    .string()
    .length(8, {
      message: "Please enter a valid date of birth (DD/MM/YYYY).",
    })
    .refine((value) => isDobValid(value), {
      message: "Please enter a valid date of birth (DD/MM/YYYY).",
    }),
  gender: z.enum(["MALE", "FEMALE"], { message: "Please select a gender." }),
});

function isDobValid(value) {
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);

  if (Number(day) > 31 || Number(month) > 12) {
    return false;
  }

  const date = dayjs(`${year}-${month}-${day}`, "YYYY-MM-DD", true);
  if (!date.isValid() || date.isAfter(dayjs())) {
    return false;
  }
  return true;
}

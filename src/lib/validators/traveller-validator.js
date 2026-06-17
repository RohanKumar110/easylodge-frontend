import { z } from "zod";
import { isDobValid } from "../utils";

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

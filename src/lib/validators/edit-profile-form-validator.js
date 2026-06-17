import z from "zod";
import { isDobValid } from "../utils";
import dayjs from "dayjs";

export const editProfileSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  dateOfBirth: z
    .string()
    .length(8, {
      message: "Please enter a valid date of birth.",
    })
    .refine((value) => isDobValid(value), {
      message: "Please enter a valid date of birth.",
    })
    .transform((value) => dayjs(value, "YYYYMMDD").format("YYYY-MM-DD"))
    .optional(),
  gender: z
    .enum(["MALE", "FEMALE"], { message: "Please select a gender." })
    .optional(),
  contactNumber: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, {
      message: "Please enter a valid US phone number.",
    })
    .optional(),
  profilePicture: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .optional()
    .or(z.literal("")),
});

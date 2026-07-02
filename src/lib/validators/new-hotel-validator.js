import z from "zod";

export const newHotelSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long"),

  active: z.boolean(),

  images: z
    .array(z.string())
    .min(1, "Images are required")
    .max(10, "You can upload up to 10 images"),

  amenities: z
    .array(z.string())
    .min(1, "Amenities are required")
    .max(10, "You can upload up to 20 amenities"),

  email: z.string().min(1, "Email is required").email("Invalid Email"),

  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\d{3}-\d{3}-\d{4}$/,
      "Phone number must be in the format 123-456-7890"
    ),

  city: z
    .string()
    .min(1, "City is required")
    .regex(
      /^[\p{L}0-9]+(?:[\s'\-.][\p{L}0-9]+)*$/u,
      "City name can only contain letters, numbers, spaces, hyphens, apostrophes, and periods"
    ),

  coordinates: z
    .string()
    .min(1, "Coordinates is required")
    .regex(
      /^\s*([+-]?([1-8]?\d(\.\d+)?|90(\.0+)?))\s*,\s*([+-]?((1[0-7]\d)|([1-9]?\d))(\.\d+)?|180(\.0+)?)\s*$/,
      "Coordinates must be in 'lat,long' format with valid latitude (-90 to 90) and longitude (-180 to 180)"
    ),

  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be between 5 and 250 characters")
    .max(250, "Address must be between 5 and 250 characters"),
});

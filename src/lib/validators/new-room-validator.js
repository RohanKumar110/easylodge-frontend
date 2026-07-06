import z from "zod";

export const newRoomSchema = z.object({
  type: z.string().min(1, "Room type is required"),

  basePrice: z.coerce
    .number()
    .min(1, "Base price is required")
    .positive("Base price must be greater than 0"),

  images: z
    .array(z.string())
    .min(1, "Hotel Images are required")
    .max(10, "You can upload up to 10 images"),

  amenities: z
    .array(z.string())
    .min(1, "Amenities are required")
    .max(10, "You can upload up to 10 amenities"),

  totalRoomsCount: z.coerce.number().min(1, "Total count is required"),

  capacity: z.coerce.number().min(1, "Capacity is required"),
});

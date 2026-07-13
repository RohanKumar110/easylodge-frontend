import z from "zod";

const editInventorySchema = z.object({

  bookingDates: z.object({
    from: z.date(),
    to: z.date(),
  }),

  surgeFactor: z.coerce
    .number({ message: "The surge factor is invalid" })
    .min(1),

  closed: z.boolean(),
});

export default editInventorySchema;
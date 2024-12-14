import * as z from "zod"

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  ingredients: z.string().min(3, "Ingredients must be at least 3 characters"),
})

export type ProductFormValues = z.infer<typeof productSchema>

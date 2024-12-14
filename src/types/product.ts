import { Product } from "@prisma/client"

export type CreateProductInput = Pick<Product, "name" | "ingredients">

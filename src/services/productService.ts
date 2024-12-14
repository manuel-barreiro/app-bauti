import { CreateProductInput } from "@/types/product"
import { Product } from "@prisma/client"

export const productService = {
  getProduct: async (id: string): Promise<Product> => {
    const response = await fetch(`/api/products/${id}`)

    if (!response.ok) {
      throw new Error("Failed to fetch product")
    }

    return response.json()
  },
  create: async (data: CreateProductInput): Promise<Product> => {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to create product")
    }

    return response.json()
  },
  update: async (id: string, data: CreateProductInput): Promise<Product> => {
    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Failed to update product")
    }

    return response.json()
  },
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { productService } from "@/services/productService"
import type { CreateProductInput } from "@/types/product"

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductInput) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateProductInput) => productService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "list"] })
    },
  })
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { productService } from "@/services/productService"
import type { CreateProductInput } from "@/types/product"

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => productService.getProduct(id),
  })
}

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

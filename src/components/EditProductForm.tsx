"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  productSchema,
  type ProductFormValues,
} from "@/lib/validations/product"
import { useUpdateProduct } from "@/hooks/useProducts"
import { Product } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface EditProductFormProps {
  product: Product
}

export function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter()
  const { mutate, isPending, isError, error } = useUpdateProduct(product.id)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    values: {
      name: product.name,
      ingredients: product.ingredients,
    },
  })

  function onSubmit(data: ProductFormValues) {
    mutate(data, {
      onSuccess: () => {
        router.push("/")
        router.refresh()
      },
    })
  }

  return (
    <Form {...form}>
      {isError && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          Error: {error?.message || "Failed to update product"}
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Enter product name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredients</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPending}
                  className="h-48"
                  placeholder="Enter ingredients"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </Form>
  )
}

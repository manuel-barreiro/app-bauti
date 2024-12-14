"use client"

import { useRouter } from "next/navigation"
import { useCreateProduct } from "@/hooks/useProducts"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  productSchema,
  type ProductFormValues,
} from "@/lib/validations/product"

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

export default function NewProduct() {
  const router = useRouter()
  const { mutate, isPending, isError, error } = useCreateProduct()

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      ingredients: "",
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
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Add New Product</h1>
      {isError && (
        <div className="mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          Error: {error?.message || "Failed to create product"}
        </div>
      )}
      <Form {...form}>
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
                    placeholder="Enter ingredients"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Product"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

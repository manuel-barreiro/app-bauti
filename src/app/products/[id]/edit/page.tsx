import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { EditProductForm } from "@/components/EditProductForm"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const product = await prisma.product.findUnique({
    where: { id: id },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Edit Product</h1>
      <EditProductForm product={product} />
    </div>
  )
}

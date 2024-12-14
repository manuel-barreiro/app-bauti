import { prisma } from "@/lib/prisma"
import { ProductQRCode } from "@/components/ProductQRCode"
import { notFound } from "next/navigation"

export default async function ProductPage({
  params,
}: {
  params: { id: Promise<string> }
}) {
  const idParams = await params
  const id = idParams.id?.toString() || ""
  const product = await prisma.product.findUnique({
    where: { id: id },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-4">{product.ingredients}</p>
      <div className="mt-4">
        <ProductQRCode productId={product.id} />
      </div>
    </div>
  )
}

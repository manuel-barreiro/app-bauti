import { prisma } from "@/lib/prisma"
import { ProductTableWrapper } from "@/components/ProductTableWrapper"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const ITEMS_PER_PAGE = 10

export default async function Home({
  searchParams,
}: {
  searchParams: { page?: string; search?: string }
}) {
  const currentPage = Number(searchParams.page) || 0
  const search = searchParams.search || ""

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    skip: currentPage * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
  })
  const total = await prisma.product.count({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  })
  const pageCount = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>
      <ProductTableWrapper
        data={products}
        pageCount={pageCount}
        currentPage={currentPage}
        search={search}
      />
    </div>
  )
}

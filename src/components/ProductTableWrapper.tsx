"use client"

import { ProductTable } from "./ProductTable"
import { Product } from "@prisma/client"
import { useRouter } from "next/navigation"

interface ProductTableWrapperProps {
  data: Product[]
  pageCount: number
  currentPage: number
}

export function ProductTableWrapper({
  data,
  pageCount,
  currentPage,
}: ProductTableWrapperProps) {
  const router = useRouter()

  return (
    <ProductTable
      data={data}
      pageCount={pageCount}
      currentPage={currentPage}
      onPageChange={(page) => {
        router.push(`/?page=${page}`)
      }}
    />
  )
}

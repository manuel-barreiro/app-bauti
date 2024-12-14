"use client"

import { ProductTable } from "./ProductTable"
import { Product } from "@prisma/client"
import { useRouter } from "next/navigation"

interface ProductTableWrapperProps {
  data: Product[]
  pageCount: number
  currentPage: number
  search: string
}

export function ProductTableWrapper({
  data,
  pageCount,
  currentPage,
  search,
}: ProductTableWrapperProps) {
  const router = useRouter()

  const handleSearch = (term: string) => {
    router.push(`/?search=${term}`)
  }

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}${search ? `&search=${search}` : ""}`)
  }

  return (
    <ProductTable
      data={data}
      pageCount={pageCount}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onSearch={handleSearch}
      searchValue={search}
    />
  )
}

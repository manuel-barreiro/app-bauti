import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ProductQRCode } from "./ProductQRCode"
import Link from "next/link"
import { Product } from "@prisma/client"

interface ProductTableProps {
  data: Product[]
  pageCount: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function ProductTable({
  data,
  pageCount,
  currentPage,
  onPageChange,
}: ProductTableProps) {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "ingredients",
      header: "Ingredients",
      cell: ({ row }) => (
        <div className="max-w-md truncate">{row.getValue("ingredients")}</div>
      ),
    },
    {
      id: "qr",
      header: "QR Code",
      cell: ({ row }) => (
        <ProductQRCode productId={row.original.id} size={60} />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="space-x-2">
          <Link href={`/products/${row.original.id}`}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
          <Link href={`/products/${row.original.id}/edit`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageCount - 1}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

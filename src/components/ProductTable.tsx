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
import { Input } from "./ui/input"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useDeleteProduct } from "@/hooks/useProducts"
import { useRouter } from "next/navigation"
import {
  Loader2,
  LucideEye,
  EditIcon,
  TrashIcon,
  Search,
  X,
} from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

interface ProductTableProps {
  data: Product[]
  pageCount: number
  currentPage: number
  onPageChange: (page: number) => void
  onSearch: (term: string) => void
  searchValue: string
}

export function ProductTable({
  data,
  pageCount,
  currentPage,
  onPageChange,
  onSearch,
  searchValue,
}: ProductTableProps) {
  const router = useRouter()
  const [isSearching, setIsSearching] = useState(false)
  const [searchInput, setSearchInput] = useState(searchValue)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)
    await onSearch(searchInput)
    setIsSearching(false)
  }
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
      cell: ({ row }) => {
        const queryClient = useQueryClient()
        const [showDeleteDialog, setShowDeleteDialog] = useState(false)
        const deleteProduct = useDeleteProduct()
        const product = row.original

        const handleDelete = async () => {
          try {
            await deleteProduct.mutateAsync(product.id)
            setShowDeleteDialog(false)
            router.refresh()
          } catch (error) {
            console.error("Failed to delete product:", error)
          }
        }

        return (
          <>
            <div className="space-x-2">
              <Link href={`/products/${row.original.id}`}>
                <Button variant="outline" size="sm">
                  <LucideEye className="size-4" />
                </Button>
              </Link>
              <Link href={`/products/${row.original.id}/edit`}>
                <Button variant="outline" size="sm">
                  <EditIcon className="size-4" />
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                disabled={deleteProduct.isPending}
              >
                {deleteProduct.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <TrashIcon className="size-4" />
                )}
              </Button>
            </div>

            <AlertDialog
              open={showDeleteDialog}
              onOpenChange={setShowDeleteDialog}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the product.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={deleteProduct.isPending}
                  >
                    {deleteProduct.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      <div className="mb-4">
        <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="max-w-sm"
          />
          <Button type="submit" disabled={isSearching}>
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </form>
        {searchValue && (
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing results for:{" "}
              <span className="font-medium">{searchValue}</span>
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearch("")}
              className="h-auto p-0"
            >
              <X className="mr-1 h-4 w-4" />
              Show all
            </Button>
          </div>
        )}
      </div>
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
      <div className="mt-4 flex items-center justify-between px-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(0)}
            disabled={currentPage === 0}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <span className="mx-4 text-sm text-muted-foreground">
            Page {currentPage + 1} of {pageCount}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pageCount - 1)}
            disabled={currentPage === pageCount - 1}
          >
            Last
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {currentPage * 10 + 1}-
          {Math.min((currentPage + 1) * 10, pageCount * 10)} of {pageCount * 10}{" "}
          items
        </div>{" "}
      </div>
    </div>
  )
}

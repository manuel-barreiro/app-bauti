import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  const product = await prisma.product.findUnique({
    where: { id: id },
  })
  return NextResponse.json(product)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id
  const json = await request.json()
  const product = await prisma.product.update({
    where: { id: id },
    data: json,
  })
  return NextResponse.json(product)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id

  const product = await prisma.product.delete({
    where: { id: id },
  })
  revalidatePath("/")
  return NextResponse.json(product)
}

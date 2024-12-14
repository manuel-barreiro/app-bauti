import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  })
  return NextResponse.json(product)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const json = await request.json()
  const product = await prisma.product.update({
    where: { id: params.id },
    data: json,
  })
  return NextResponse.json(product)
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.delete({
    where: { id: params.id },
  })
  return NextResponse.json(product)
}
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await prisma.product.findMany()
  return NextResponse.json(products)
}

export async function POST(request: Request) {
  const json = await request.json()
  const product = await prisma.product.create({
    data: json,
  })
  return NextResponse.json(product)
}
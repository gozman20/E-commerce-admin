import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated");

    const { name, billboardId } = await req.json();
    if (!name) return new NextResponse("label is required");
    if (!billboardId) return new NextResponse("image url is required");

    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorised", { status: 403 });
    }
    const category = await prismadb.category.create({
      data: { name, billboardId, storeId: params.storeId },
    });
    return NextResponse.json(category);
  } catch (err) {
    console.log(`[BILLBOARD_POST]`, err);

    return NextResponse.error();
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store Id is required", { status: 400 });
    }

    const categories = await prismadb.category.findMany({
      where: { storeId: params.storeId },
    });
    return NextResponse.json(categories);
  } catch (err) {
    console.log(`[CATEGORIES_GET]`, err);

    return NextResponse.error();
  }
}

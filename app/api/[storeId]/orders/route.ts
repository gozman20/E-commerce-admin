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

    const { label, imageUrl } = await req.json();
    if (!label) return new NextResponse("label is required");
    if (!imageUrl) return new NextResponse("image url is required");

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
    const billboard = await prismadb.billboard.create({
      data: { label, imageUrl, storeId: params.storeId },
    });
    return NextResponse.json(billboard);
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

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
      },
    });

    const billboards = await prismadb.billboard.findMany({
      where: { storeId: params.storeId },
    });
    return NextResponse.json(billboards);
  } catch (err) {
    console.log(`[BILLBOARD_GET]`, err);

    return NextResponse.error();
  }
}

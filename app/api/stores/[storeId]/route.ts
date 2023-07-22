import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const { name } = await req.json();
    if (!userId)
      return new NextResponse("Unauthorised/Unathenticated", { status: 401 });
    if (!name)
      return new NextResponse("Name is required --Bad-request", {
        status: 400,
      });
    if (!params.storeId)
      return new NextResponse("Store Id is required", { status: 400 });

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log(`[STORE_PATCH]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId)
      return new NextResponse("Unauthorised/Unathenticated", { status: 401 });

    if (!params.storeId)
      return new NextResponse("Store Id is required", { status: 400 });

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log(`[STORE_DELETE]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorised");

    const { name } = await req.json();
    if (!name) return new NextResponse("Name is required");

    const store = await prismadb.store.create({
      data: { name, userId },
    });
    return NextResponse.json(store);
  } catch (err) {
    console.log(`[STORES_POST]`, err);

    return NextResponse.error();
  }
}

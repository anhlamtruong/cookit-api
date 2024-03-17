import { NextResponse } from "next/server";
import prismaStore from "@/lib/service/prisma_store";

export async function GET(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const store = await prismaStore.store.findUnique({
      where: { id: params.storeId },
      include: {
        billboards: true,
        menus: {
          include: {
            images: true,
          },
        },
        sizes: true,
        categories: true,
      },
    });

    if (store) {
      return NextResponse.json(store);
    } else {
      return new NextResponse("API ERROR", {
        status: 402,
        statusText: "No store found",
      } as ResponseInit);
    }
  } catch (error) {
    console.error("[STORE_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

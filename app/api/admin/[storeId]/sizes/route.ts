import { currentUser } from "@/lib/auth";
import prismaMySQL from "@/lib/service/prisma_mysql";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const user = await currentUser();
    const body = await req.json();
    const { name, value } = body;
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await prismaMySQL.store.findFirst({
      where: {
        id: params.storeId,
        userId: user.id,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const size = await prismaMySQL.size.create({
      data: {
        name,
        quantity: value,
        storeId: params.storeId,
      },
    });
    if (!size) {
      return new NextResponse("Could not create size", {
        status: 403,
      });
    }

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZES_POST]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const user = await currentUser();
    const body = await req.json();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 400 });
    }

    const storeByUserId = await prismaMySQL.store.findFirst({
      where: {
        id: params.storeId,
        userId: user.id,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const sizes = await prismaMySQL.size.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

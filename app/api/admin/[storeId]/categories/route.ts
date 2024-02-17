import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
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
    const { name, billboardId } = body;
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("BillboardId is required", { status: 400 });
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

    const category = await prismaMySQL.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });
    if (!category) {
      return new NextResponse("Could not create category", {
        status: 403,
      });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
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

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
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

    const categories = await prismaMySQL.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

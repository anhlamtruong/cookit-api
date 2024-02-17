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
    const { label, imageUrl } = body;
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    if (!label) {
      return new NextResponse("Label is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL is required", { status: 400 });
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

    const billboard = await prismaMySQL.billboard.create({
      data: {
        label: label,
        imageUrl: imageUrl,
        storeId: params.storeId,
      },
    });
    if (!billboard) {
      return new NextResponse("Could not create store", {
        status: 403,
      });
    }

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
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

    const billboards = await prismaMySQL.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

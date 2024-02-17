import { NextResponse } from "next/server";
import prismaMySQL from "@/lib/service/prisma_mysql";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    const user = await currentUser();
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    const userId = user?.id;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }

    const category = await prismaMySQL.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const storeByUserId = await prismaMySQL.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const category = await prismaMySQL.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const body = await req.json();

    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id is required", { status: 400 });
    }

    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    const storeByUserId = await prismaMySQL.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const category = await prismaMySQL.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

import { NextResponse } from "next/server";
import prismaMySQL from "@/lib/service/prisma_mysql";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";

export async function GET(
  req: Request,
  { params }: { params: { menuId: string } }
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    if (!params.menuId) {
      return new NextResponse("Menu id is required", { status: 400 });
    }

    const menu = await prismaMySQL.menu.findUnique({
      where: {
        id: params.menuId,
      },
      include: {
        images: true,
        category: true,
        size: true,
      },
    });

    return NextResponse.json(menu);
  } catch (error) {
    console.log("[MENU_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { menuId: string; storeId: string } }
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

    if (!params.menuId) {
      return new NextResponse("Menu id is required", { status: 400 });
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

    const menu = await prismaMySQL.menu.delete({
      where: {
        id: params.menuId,
      },
    });

    return NextResponse.json(menu);
  } catch (error) {
    console.log("[MENU_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { menuId: string; storeId: string } }
) {
  try {
    const user = await currentUser();
    const userId = user?.id;
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }

    const { name, price, categoryId, images, sizeId, isFeatured, isArchived } =
      body;

    if (!params.menuId) {
      return new NextResponse("Menu id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    if (!params.menuId) {
      return new NextResponse("Menu id is required", { status: 400 });
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

    const menu = await prismaMySQL.menu.update({
      where: {
        id: params.menuId,
      },
      data: {
        name,
        price,
        categoryId,
        sizeId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    return NextResponse.json(menu);
  } catch (error) {
    console.log("[MENU_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

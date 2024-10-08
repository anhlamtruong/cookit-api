import { NextResponse } from "next/server";
import prismaStore from "@/lib/service/prisma_store";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";

export async function GET(request: Request, context: any) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    const { params } = context;
    if (!params) {
      return new NextResponse("API ERROR", {
        status: 400,
        statusText: "Can't get params from context",
      } as ResponseInit);
    }
    const storeId = params.storeId;

    const store = await prismaStore.store.findUnique({
      where: { id: storeId as string },
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

export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    const userId = user.id;
    const body = await request.json();
    const { name, imageUrl } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const store = await prismaStore.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
        imageUrl: imageUrl ?? null,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORE_PATCH]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    const userId = user.id;

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const store = await prismaStore.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.error("[STORE_DELETE]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

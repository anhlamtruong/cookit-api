import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { Prisma } from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";
import { currentUser } from "@/lib/auth";
import prismaStore from "@/lib/service/prisma_store";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    const { name, chefId } = body;
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name of the Store is required", { status: 400 });
    }
    if (!chefId) {
      return new NextResponse("ChefId of the Store is required", {
        status: 400,
      });
    }
    const existingStore = await prismaStore.store.findUnique({
      where: {
        name: name,
      },
    });

    if (existingStore) {
      return new NextResponse("Store name already in use", { status: 409 }); // 409 Conflict
    }

    const store = await prismaStore.store.create({
      data: {
        name: name,
        userId: user.id,
        chefId: chefId,
      },
    });
    if (!store) {
      return new NextResponse("Could not create store", {
        status: 403,
      });
    }

    return NextResponse.json(store);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Check for unique constraint violation
      if (error.code === "P2002") {
        return new NextResponse(
          `A store with the name "${name}" already exists.`,
          {
            status: 409,
          }
        );
      }
    }
    console.log("[STORES_POST]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
export async function GET(request: Request) {
  try {
    const user = await currentUser();

    if (!user || !user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const store = await prismaStore.store.findFirst({
      where: { userId: user.id },
    });

    if (store) {
      return NextResponse.json(store);
    } else {
      return new NextResponse(
        "Don't have any store associate with account ㄟ( ▔, ▔ )ㄏ",
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.log(error, "ADMIN ERROR");
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

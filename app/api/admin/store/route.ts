import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { currentUser } from "@/lib/auth";
import prismaMySQL from "@/lib/service/prisma_mysql";
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
    const { name } = body;
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name of the Store is required", { status: 400 });
    }

    const store = await prismaMySQL.store.create({
      data: {
        name: name,
        userId: user.id,
      },
    });
    if (!store) {
      return new NextResponse("Could not create store", {
        status: 403,
      });
    }

    return NextResponse.json(store);
  } catch (error) {
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
    if (!user?.id) {
      return NextResponse.redirect(new URL("/sign-in"));
    }

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    const store = await prismaMySQL.store.findFirst({
      where: { userId: user.id },
    });

    if (store) {
      return NextResponse.json(store);
    } else {
      if (origin) {
        return NextResponse.redirect(new URL(`${origin}/store_admin`));
      } else {
        new URL(`/store_admin`);
      }
    }
  } catch (error) {
    console.log(error, "ADMIN ERROR");
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

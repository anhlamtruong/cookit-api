import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { currentUser } from "@/lib/auth";
import prismaMySQL from "@/lib/service/prisma_mysql";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    const categories = await prismaMySQL.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_PUBLIC_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

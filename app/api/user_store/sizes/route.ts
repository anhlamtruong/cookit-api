import { NextResponse } from "next/server";
import prismaMySQL from "@/lib/service/prisma_mysql";

export async function GET(req: Request) {
  try {
    const sizes = await prismaMySQL.size.findMany();

    return NextResponse.json(sizes);
  } catch (error) {
    console.log("[SIZES_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

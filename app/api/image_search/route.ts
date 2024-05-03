// import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
// import { Prisma } from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";
import { currentUser } from "@/lib/auth";
import { redis } from "@/lib/redis/cache/redis";
import axios from "axios";

import { NextRequest, NextResponse } from "next/server";

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export async function GET(request: NextRequest) {
  try {
    const query = request.nextUrl.searchParams.get("query");
    const user = await currentUser();

    if (!user || !user?.id) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const cachedResults = await redis.get(`images:${query}`);
    if (cachedResults) {
      return NextResponse.json(JSON.parse(cachedResults));
    }

    const response = await axios.get(`${process.env.PIXABAY_API_DOMAIN}`, {
      params: {
        key: process.env.PIXABAY_API_KEY, // Replace with your actual API key
        q: query,
        image_type: "photo",
        safesearch: true,
      },
    });

    await redis.set(
      `images:${query}`,
      JSON.stringify(response.data),
      "EX",
      24 * 60 * 60
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.log("[IMAGE_SEARCH_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

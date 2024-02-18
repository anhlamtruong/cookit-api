import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import { Chef } from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";
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
    const { bio, images } = body;
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!bio) {
      return new NextResponse("Bio of the Store is required", { status: 400 });
    }

    const chef = await prismaStore.chef.create({
      data: {
        bio: bio as string,
        profilePictures: {
          create: images.map((img: { url: string; description: string }) => {
            return {
              url: img.url,
              description: img.description,
            };
          }),
        },
        userId: user.id,
      },
      include: {
        profilePictures: true,
      },
    });
    if (!chef) {
      return new NextResponse("Could not create chef", {
        status: 403,
      });
    }

    return NextResponse.json(chef);
  } catch (error) {
    console.log("[CHEF_POST]", error);
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

    const chef = await prismaStore.chef.findFirst({
      include: {
        profilePictures: true,
      },
    });
    if (chef) {
      return NextResponse.json(chef);
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.log(error, "ADMIN ERROR");
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

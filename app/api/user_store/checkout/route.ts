import { NextResponse, type NextRequest } from "next/server";
import prismaStore from "@/lib/service/prisma_store";
import { OrderStatus } from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";

/**
 * Update the order
 * @param req
 */
export async function POST(req: NextRequest) {
  try {
    // Get JSON payload
    const { orders, userId } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    console.log(userId);

    if (!orders || orders.length === 0) {
      return new NextResponse("Orders data is required", { status: 400 });
    }

    const test = await Promise.all(
      orders.map(
        async ({
          storeId,
          totalAmount,
          orderItems,
          notes,
        }: {
          storeId: string;
          totalAmount: number;
          orderItems: any;
          notes: string;
        }) => {
          await prismaStore.order.create({
            data: {
              customerId: userId,
              storeId,
              isPaid: false,
              status: OrderStatus.PLACED,
              totalAmount,
              notes,
              orderItems: {
                create: orderItems.map(
                  ({
                    menuId,
                    quantity,
                    unitPrice,
                  }: {
                    menuId: string;
                    quantity: number;
                    unitPrice: number;
                  }) => ({
                    menuId,
                    quantity,
                    unitPrice,
                  })
                ),
              },
            },
          });
        }
      )
    );

    return NextResponse.json("Successfully Place", { status: 200 });
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

// Endpoints
// ========================================================
// /**
//  * Basic OPTIONS Request to simuluate OPTIONS preflight request for mutative requests
//  */
export const OPTIONS = async (request: NextRequest) => {
  // Return Response
  return NextResponse.json(
    {},
    {
      status: 200,
      // headers: getCorsHeaders(request.headers.get("origin") || ""),
    }
  );
};

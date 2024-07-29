import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import {
  Prisma,
  UserRole,
} from "@/generated/authenticate/@prisma-client-authenticate";
import prismaFinance from "@/lib/service/prisma_finance";

export async function GET(
  req: NextRequest,
  { params }: { params: { accountId: string } }
) {
  try {
    const user = await currentUser();
    const account_id = params.accountId;

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    if (!account_id) {
      return new NextResponse("Bad request: Missing Id to fetch account", {
        status: 400,
      });
    }

    const account = await prismaFinance.accounts.findUnique({
      where: {
        userId: user.id,
        id: account_id,
      },
    });
    if (!account) {
      return new NextResponse("Bad request: Account not found using the id", {
        status: 404,
      });
    }

    return NextResponse.json(account);
  } catch (error) {
    console.error("[FINANCE_ACCOUNT_ID_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Failed to fetch account",
    } as ResponseInit);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { accountId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const account_id = params.accountId;

    const { name: newAccountName } = body;
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    if (!account_id) {
      return new NextResponse("Bad request: Missing Id to fetch account", {
        status: 400,
      });
    }
    if (!newAccountName || newAccountName === "account_undefined") {
      return new NextResponse("Name of the Account is required", {
        status: 400,
      });
    }
    console.log(newAccountName);

    const account = await prismaFinance.accounts.update({
      where: {
        userId: user.id,
        id: account_id,
      },
      data: {
        name: newAccountName,
      },
    });
    if (!account) {
      return new NextResponse(
        "Bad request: Can not update the account using the id",
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(account);
  } catch (error) {
    console.error("[FINANCE_ACCOUNT_ID_PATCH]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Failed to fetch account",
    } as ResponseInit);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { accountId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    const account_id = params.accountId;

    if (!account_id) {
      return new NextResponse("Bad request:No account IDs provided", {
        status: 400,
      });
    }

    const result = await prismaFinance.accounts.delete({
      where: {
        id: account_id,
      },
    });

    return new NextResponse("Success: Successfully delete account", {
      status: 200,
    });
  } catch (error) {
    console.log("[FINANCE_ACCOUNT_DELETE]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

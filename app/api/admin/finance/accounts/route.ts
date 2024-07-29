import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";
import prismaFinance from "@/lib/service/prisma_finance";
import { Prisma } from "@/generated/cookit-finance-service/@prisma-client-cookit-finance-service";
import { format } from "date-fns";
export async function POST(req: NextRequest) {
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

    if (!name) {
      return new NextResponse("Name of the Account is required", {
        status: 400,
      });
    }
    const account = await prismaFinance.accounts.create({
      data: {
        name: name,
        userId: user.id,
        plaidId: "test",
        createAt: new Date(),
        updateAt: new Date(),
      },
    });
    if (!account) {
      return new NextResponse("Could not create account", {
        status: 403,
      });
    }

    return NextResponse.json(account);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Check for unique constraint violation
      if (error.code === "P2002") {
        return new NextResponse(
          `A account with the name "${name}" already exists.`,
          {
            status: 409,
          }
        );
      }
    }
    console.log("[FINANCE_ACCOUNTS_POST]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();

    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    const { ids: account_ids } = body;

    // Ensure account_ids is an array and has at least one valid ID
    if (!Array.isArray(account_ids) || account_ids.length === 0) {
      console.error("Invalid or empty account_ids:", account_ids);
      return new NextResponse("Bad Request: No account IDs provided", {
        status: 400,
      });
    }

    const result = await prismaFinance.accounts.deleteMany({
      where: {
        id: {
          in: account_ids,
        },
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Check for unique constraint violation
      if (error.code === "P2002") {
        return new NextResponse(
          `A account with the name "${name}" already exists.`,
          {
            status: 409,
          }
        );
      }
    }
    console.log("[FINANCE_ACCOUNTS_DELETE]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }

    //  accounts
    const accounts = await prismaFinance.accounts.findMany({
      where: {
        userId: user.id,
      },
    });
    const formattedAccounts = accounts.map((account) => ({
      ...account,
      createAt: format(account.createAt, "MM/dd/yyyy"),
    }));

    return NextResponse.json(formattedAccounts);
  } catch (error) {
    console.log("[FINANCE_ACCOUNTS_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Failed to fetch accounts",
    } as ResponseInit);
  }
}

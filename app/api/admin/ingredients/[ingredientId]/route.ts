import { db } from "@/services/firebase/firebase";
import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDocFromCache,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { currentUser } from "@/lib/auth";

import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { ingredientId: string } }
) {
  try {
    const body = await req.json();

    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    const { ingredient }: { ingredient: Ingredient } = body;

    const ingredientDocRef = doc(db, "ingredients", params.ingredientId);
    const ingredientWithLowercaseName = {
      ...ingredient,
      createAt: Timestamp.now(),
      lowercase_name: ingredient.name.toLowerCase(),
    };

    try {
      await updateDoc(ingredientDocRef, ingredientWithLowercaseName);
    } catch (error) {
      console.error("[INGREDIENTS_PATCH]", error);
      return new NextResponse("API ERROR", {
        status: 501,
        statusText: "No document reference in the database",
      } as ResponseInit);
    }
    if (ingredientDocRef)
      return new NextResponse("Update Success", { status: 200 });
  } catch (error) {
    console.error("[INGREDIENTS_PATCH]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { ingredientId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }

    try {
      await deleteDoc(doc(db, "ingredients", params.ingredientId));
    } catch (error) {
      console.error("[INGREDIENTS_DELETE]", error);
      return new NextResponse("API ERROR", {
        status: 502,
        statusText: "Cannot find ingredient document under collection",
      } as ResponseInit);
    }

    try {
      const userRef = await doc(db, "users", user.id);
      const userIngredientDocRef = doc(
        collection(userRef, "ingredients"),
        params.ingredientId
      );
      await deleteDoc(userIngredientDocRef);
    } catch (error) {
      console.error("[INGREDIENTS_DELETE]", error);
      return new NextResponse("API ERROR", {
        status: 501,
        statusText: "Cannot find ingredientRef under user id",
      } as ResponseInit);
    }

    return new NextResponse("Delete Success", { status: 200 });
  } catch (error) {
    console.error("[INGREDIENTS_DELETE]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Internal Server Error",
    } as ResponseInit);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { ingredientId: string } }
) {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (user.role === UserRole.USER) {
      return new NextResponse("Unauthorized", { status: 402 });
    }
    const ingredientDocRef = doc(db, "ingredients", params.ingredientId);

    try {
      const ingredientDoc = await getDocFromCache(ingredientDocRef);

      console.info("Cached document data:", ingredientDoc.data());
      return NextResponse.json(ingredientDoc.data());
    } catch (e) {
      console.error("Error getting cached document:", e);
      try {
        const ingredientDoc = await getDoc(ingredientDocRef);

        console.info("Document data:", ingredientDoc.data());
        return NextResponse.json(ingredientDoc.data());
      } catch (e) {
        console.error("[INGREDIENT_GET]", e);
        return new NextResponse("API ERROR", {
          status: 501,
          statusText: "No document in the database",
        } as ResponseInit);
      }
    }
  } catch (error) {
    console.error("[INGREDIENT_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Failed to fetch ingredients",
    } as ResponseInit);
  }
}

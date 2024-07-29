import { db } from "@/services/firebase/firebase";
import { NextRequest, NextResponse } from "next/server";
import { collection, where, getDocs, query } from "firebase/firestore";
import { currentUser } from "@/lib/auth";
import { NextApiResponse } from "next";
import {
  createIngredientRedis,
  searchIngredientRedis,
} from "@/lib/redis/db/ingredients.cache";
import { isEmpty } from "lodash";
const url = require("url");

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const q = req.nextUrl.searchParams.get("ingredient_q")?.toLowerCase();

    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const cacheIngredients = await searchIngredientRedis(q ?? "");

    if (!isEmpty(cacheIngredients)) {
      return NextResponse.json(cacheIngredients);
    } else {
      console.info(`Search data using query: ${q} from Redis Cache not found`);
    }
    // Initialize Firestore instance
    const ingredientsRef = collection(db, "ingredients"); // Get collection reference
    const qSnap = query(
      ingredientsRef,
      where("lowercase_name", ">=", q),
      where("lowercase_name", "<=", q + "\uf8ff")
    );
    const querySnapshot = await getDocs(qSnap);
    const matchingIngredientsPromise = querySnapshot.docs.map(async (doc) => {
      await createIngredientRedis(doc.data() as Ingredient, doc.id);
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    const matchingIngredients = await Promise.all(matchingIngredientsPromise);
    return NextResponse.json(matchingIngredients);
  } catch (error) {
    console.log("[INGREDIENTS_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Failed to fetch ingredients",
    } as ResponseInit);
  }
}

import {
  getDownloadURL,
  listAll,
  ref,
  storage,
} from "@/services/firebase/storage";
import { db } from "@/services/firebase/firebase";
import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  getDoc,
  Timestamp,
  DocumentReference,
  getDocs,
} from "firebase/firestore";
import { currentUser } from "@/lib/auth";
import { format } from "date-fns";
import { UserRole } from "@/generated/authenticate/@prisma-client-authenticate";

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
    const { ingredients }: { ingredients: Ingredient[] } = body;

    const ingredientCollectionRef = await collection(db, "ingredients");
    const ingredientPromises = ingredients.map(
      async (ingredient: Ingredient) => {
        const ingredientWithLowercaseName = {
          ...ingredient,
          createAt: Timestamp.now(),
          lowercase_name: ingredient.name.toLowerCase(),
        };

        return addDoc(ingredientCollectionRef, ingredientWithLowercaseName);
      }
    );

    const ingredientRefs = await Promise.all(ingredientPromises);

    const userRef = await doc(db, "users", user.id);

    await Promise.all(
      ingredientRefs.map(async (ingredientRef) => {
        const userIngredientDocRef = doc(
          collection(userRef, "ingredients"),
          ingredientRef.id
        );
        return setDoc(userIngredientDocRef, { ingredientRef });
      })
    );
    // await updateDoc(userRef, {
    //   ingredients: arrayUnion(...ingredientRefs),
    // });

    return new NextResponse("Upload Success", { status: 200 });
  } catch (error) {
    console.log("[INGREDIENTS_POST]", error);
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

    const userRef = await doc(db, "users", user.id);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      // const userIngredients = userDoc.data().ingredients;
      // const ingredientPromises = userIngredients.map((ref: DocumentReference) =>
      //   getDoc(ref)
      // );
      // const ingredientDocs = await Promise.all(ingredientPromises);

      //* Fetch ingredient references from sub_collection

      const ingredientsCollection = collection(userRef, "ingredients");
      const ingredientsSnapshot = await getDocs(ingredientsCollection);

      const ingredientRefDocs = ingredientsSnapshot.docs;

      // Fetch ingredient details using references
      const ingredientPromises = ingredientRefDocs.map((doc) => {
        return getDoc(doc.data().ingredientRef as DocumentReference);
      }); // Access the reference
      const ingredientDocs = await Promise.all(ingredientPromises);

      const ingredients = ingredientDocs.map((doc) => {
        const data = doc.data();

        // Add this debugging line

        if (data?.createAt instanceof Timestamp) {
          return {
            ...data,
            id: doc.id,
            createAt: format(data.createAt.toDate(), "MM/dd/yyyy"),
          };
        } else {
          // Handle the case where createAt is not a Timestamp
          console.error("createAt is not a Timestamp", data);
          return { id: doc.id, ...data }; // Return original data
        }
      });

      return NextResponse.json(ingredients ?? []);
    } else {
      return new NextResponse("User not found", { status: 400 });
    }
  } catch (error) {
    console.log("[INGREDIENTS_GET]", error);
    return new NextResponse("API ERROR", {
      status: 500,
      statusText: "Failed to fetch ingredients",
    } as ResponseInit);
  }
}

"use client";

import { Suspense } from "react";

import LoadingOverlay from "@/components/loading_overlay";
import { useAdminIngredientQuery } from "@/hooks/store/firebase/useIngredients";
import LoadingCarrot from "@/components/ui/loading/loading-carrot";
import ErrorComponent from "@/components/ui/error";
import { IngredientForm } from "./_components/ingredient_form";
import { IngredientsForm } from "./_components/ingredients_form";

const IngredientPage = ({ params }: { params: { ingredientId: string } }) => {
  const { ingredientId } = params;
  const { data, isLoading, error } = useAdminIngredientQuery(ingredientId);

  if (data === null && params.ingredientId === "new")
    return (
      <Suspense fallback={<LoadingOverlay />}>
        <div className=" flex-col">
          <div className=" flex-1 space-y-4 p-8 pt-6">
            <IngredientsForm initialDataIngredient={null} />
          </div>
        </div>
        ;
      </Suspense>
    );

  return (
    <>
      {isLoading ? (
        <LoadingCarrot text={"Loading ingredients"} />
      ) : error ? (
        <ErrorComponent
          message={`Found an error getting data: ${error.message}`}
        />
      ) : data === undefined ? (
        <ErrorComponent
          message={`Can not find any ingredient you are looking for...`}
          variant={"not_found"}
        />
      ) : (
        <Suspense fallback={<LoadingOverlay />}>
          <div className=" flex-col">
            <div className=" flex-1 space-y-4 p-8 pt-6">
              <IngredientForm initialDataIngredient={data} />
            </div>
          </div>
          ;
        </Suspense>
      )}
    </>
  );
};

export default IngredientPage;

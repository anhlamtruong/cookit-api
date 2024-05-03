"use client";

import { Button } from "@/components/ui/button";
import ErrorComponent from "@/components/ui/error";
import LoadingCarrot from "@/components/ui/loading/loading-carrot";
import { useAdminIngredients } from "@/hooks/store/firebase/useIngredients";
import { isEmpty } from "lodash";
import React from "react";

import { Suspense } from "react";
import { IngredientClient } from "./_components/ingredients_client";
import { IngredientsColumn } from "./_components/columns";
import { useRouter } from "next/navigation";

const IngredientsPage: React.FC = () => {
  const {
    data: ingredients,
    isLoading: loadingIngredients,
    error,
  } = useAdminIngredients();

  const formattedIngredients: IngredientsColumn[] = !ingredients
    ? []
    : ingredients.map((ingredient) => ({
        id: ingredient.id,
        name: ingredient.name,
        category: ingredient.category,
        source: ingredient.source,
        measurement: ingredient.measurement,
        createAt: ingredient.createAt ? ingredient.createAt : "MM/DD/YYYY",
        description: ingredient.description,
        iconUrl: ingredient.iconURL,
        imageUrl: ingredient.imageURL,
      }));

  return loadingIngredients ? (
    <LoadingCarrot text={"Loading ingredients"}></LoadingCarrot>
  ) : isEmpty(ingredients) ? (
    <NotFoundIngredients></NotFoundIngredients>
  ) : error ? (
    <ErrorComponent
      message={`Found an error getting data: ${error.message}`}
    ></ErrorComponent>
  ) : (
    <Suspense fallback={<p>Loading ingredients client...</p>}>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <IngredientClient data={formattedIngredients}></IngredientClient>
      </main>
    </Suspense>
  );
};
export default IngredientsPage;

const NotFoundIngredients: React.FC = () => {
  const router = useRouter();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Ingredients</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="p-6  flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no ingredients (っ °Д °;)っ
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start making recipes 😋 as soon as you add ingredients.
          </p>
          <Button
            onClick={() => router.push(`/recipes_admin/ingredients/new`)}
            className="mt-4"
          >
            Add Ingredients
          </Button>
        </div>
      </div>
    </main>
  );
};

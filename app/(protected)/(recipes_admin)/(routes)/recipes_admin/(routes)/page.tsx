"use client";

import React from "react";
import { RecipesClient } from "../_components/recipes_client";

import { Suspense } from "react";

const RecipesPage: React.FC = ({}) => {
  // const origin = useOrigin();

  // const { data, error, isLoading } = useRecipes();

  // if (isLoading)
  //   return (
  //     <div className=" w-screen h-screen items-center self-center flex content-center">
  //       <ClimbingBoxLoader></ClimbingBoxLoader>
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div className=" text-destructive w-screen h-screen items-center self-center flex content-center">
  //       <ErrorComponent message={`Error: ${error.message}`}></ErrorComponent>
  //     </div>
  //   );

  return (
    <Suspense fallback={<p>Loading recipes client...</p>}>
      {/* <RecipesClient></RecipesClient>; */}
      Big summarize of Recipes
    </Suspense>
  );
};
export default RecipesPage;

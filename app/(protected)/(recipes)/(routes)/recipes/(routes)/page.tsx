"use client";

import { useRecipes } from "@/hooks/store/useRecipes";
import useOrigin from "@/hooks/store/use_origin";

import React from "react";
import { RecipesClient } from "../_components/recipes_client";
import { ClimbingBoxLoader } from "react-spinners";
import ErrorComponent from "@/components/ui/error";

const RecipesPage: React.FC = ({}) => {
  const origin = useOrigin();

  const { data, error, isLoading } = useRecipes();

  if (isLoading)
    return (
      <div className=" w-screen h-screen items-center self-center flex content-center">
        <ClimbingBoxLoader></ClimbingBoxLoader>
      </div>
    );
  if (error)
    return (
      <div className=" text-destructive w-screen h-screen items-center self-center flex content-center">
        <ErrorComponent message={`Error: ${error.message}`}></ErrorComponent>
      </div>
    );

  return <RecipesClient></RecipesClient>;
};
export default RecipesPage;

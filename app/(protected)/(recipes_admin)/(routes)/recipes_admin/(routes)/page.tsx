import React from "react";
import { RecipesClient } from "../_components/recipes_client";

import { Suspense } from "react";

const RecipesPage: React.FC = ({}) => {
  return (
    <Suspense fallback={<p>Loading recipes client...</p>}>
      Big summarize of Recipes
    </Suspense>
  );
};
export default RecipesPage;

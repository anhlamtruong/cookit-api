import { Suspense } from "react";
import { RecipeCreator } from "./_components/recipes-creator";

const RecipesPage: React.FC = ({}) => {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <RecipeCreator></RecipeCreator>
    </Suspense>
  );
};
export default RecipesPage;

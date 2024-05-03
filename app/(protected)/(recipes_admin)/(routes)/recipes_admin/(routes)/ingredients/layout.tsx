"use client";

import { IngredientModal } from "./_components/ingredient_modal";

const IngredientsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <IngredientModal></IngredientModal> */}
      {children}
    </>
  );
};

export default IngredientsLayout;

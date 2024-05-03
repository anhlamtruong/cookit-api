"use client";

import { Tabs } from "@/components/ui/tabs";
import { RecipeForm } from "./recipe_form";
import { IngredientsForm } from "../(routes)/ingredients/[ingredientId]/_components/ingredients_form";
import { Suspense } from "react";
// import { useTheme } from "next-themes";
// import { useConfig } from "@/hooks/ui/use-config";
// import { themes } from "@/registry/themes";
export const RecipesClient = () => {
  // const { theme: mode } = useTheme();
  // const [config] = useConfig();

  // const theme = themes.find((theme) => theme.name === config.theme);
  const tabs = [
    {
      title: "Ingredients",
      value: "ingredients",
      content: (
        <div className=" w-full overflow-y-auto overflow-auto relative h-full rounded-2xl p-10 text-xl md:text-4xl  text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <Suspense fallback={<p>Loading Recipes Form</p>}>
            <IngredientsForm
              initialDataIngredient={null}
              categories={[]}
              sizes={[]}
            />
          </Suspense>
        </div>
      ),
    },
    {
      title: "Recipe",
      value: "recipe",
      content: (
        <div className="w-full overflow-y-auto overflow-auto relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white">
          <Suspense fallback={<p>Loading Recipes Form</p>}>
            <RecipeForm initialDataRecipe={null} categories={[]} sizes={[]} />
          </Suspense>
        </div>
      ),
    },

    {
      title: "Playground",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Playground tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div className=" w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Content tab</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div className=" w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Random tab</p>
          <DummyContent />
        </div>
      ),
    },
  ];
  return (
    <Suspense fallback={<p>Loading tabs...</p>}>
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
        <Tabs
          tabClassName=""
          activeTabClassName="text-muted-foreground"
          contentClassName={"bg-background text-muted-foreground"}
          tabs={tabs}
        />
      </div>
    </Suspense>
  );
};

const DummyContent = () => {
  return <div className="bg-ocean-blue-backgroundPrimary">test</div>;
};

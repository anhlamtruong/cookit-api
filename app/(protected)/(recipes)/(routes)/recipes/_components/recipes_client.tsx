"use client";

import { Tabs } from "@/components/ui/tabs";
import { RecipeForm } from "./recipe_form";
import { useStyles } from "@/hooks/store/useStyles";
import { IngredientForm } from "./ingredients_form";
export const RecipesClient = () => {
  const tabs = [
    {
      title: "Ingredients",
      value: "ingredients",
      content: (
        <div className=" w-full overflow-y-auto overflow-auto relative h-full rounded-2xl p-10 text-xl md:text-4xl  text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <IngredientForm
            initialDataIngredient={null}
            categories={[]}
            sizes={[]}
          />
        </div>
      ),
    },
    {
      title: "Recipe",
      value: "recipe",
      content: (
        <div className="w-full overflow-y-auto overflow-auto relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white">
          <RecipeForm initialDataRecipe={null} categories={[]} sizes={[]} />
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
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
      <Tabs
        tabClassName="bg-light-backgroundSecondary"
        activeTabClassName="bg-light-backgroundTertiary"
        contentClassName={"bg-light-backgroundPrimary"}
        tabs={tabs}
      />
    </div>
  );
};

const DummyContent = () => {
  return <div className="bg-ocean-blue-backgroundPrimary">sadhfbasjdf</div>;
};

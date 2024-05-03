"use client";

import { Button } from "@/components/ui/button";
import React from "react";

import { Suspense } from "react";

const RecipesPage: React.FC = ({}) => {
  return (
    <Suspense fallback={<p>Loading recipes client...</p>}>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Recipes</h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="p-6  flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no recipe ㄟ( ▔, ▔ )ㄏ
            </h3>
            <p className="text-sm text-muted-foreground">
              How can I cook 🔥 without your recipes
            </p>
            <Button className="mt-4">Add Recipes</Button>
          </div>
        </div>
      </main>
    </Suspense>
  );
};
export default RecipesPage;

"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { RecipeDashboard } from "./_components/recipes-dashboard";

const RecipesPage: React.FC = ({}) => {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <RecipeDashboard></RecipeDashboard>
    </Suspense>
  );
};
export default RecipesPage;

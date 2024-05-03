"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { IngredientsColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data_table";

interface IngredientsClientProps {
  data: IngredientsColumn[];
}

export const IngredientClient: React.FC<IngredientsClientProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Ingredients (${data.length})`}
          description="Manage Ingredients for your recipes"
        />
        <Button onClick={() => router.push(`/recipes_admin/ingredients/new`)}>
          <Plus className=" mr-2 h-4 w-4" />
          Add Ingredients
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"name"} columns={columns} data={data} />
    </>
  );
};

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell_action";
import { Checkbox } from "@/components/ui/checkbox";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export type IngredientsColumn = {
  id: string;
  name: string;
  category: string;
  source: string;
  measurement: string;
  createAt: string;
  description?: string;
  iconUrl?: string;
  imageUrl?: string;
};

export const columns: ColumnDef<IngredientsColumn>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "iconUrl",
    header: "",
    cell: ({ row }) => {
      return <CellIngredientIcon data={row.original}></CellIngredientIcon>;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "source",
    header: "Source",
  },
  {
    accessorKey: "measurement",
    header: "Measurement",
  },
  {
    accessorKey: "createAt",
    header: "Created Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}></CellAction>,
  },
];

export const CellIngredientIcon = ({ data }: { data: IngredientsColumn }) => {
  const [fallbackIcon, setFallbackIcon] = useState("");

  useEffect(() => {
    data.category === "Meats"
      ? setFallbackIcon("🥩")
      : data.category === "Spices"
      ? setFallbackIcon("🧂")
      : data.category === "Fruits"
      ? setFallbackIcon("🍎")
      : data.category === "Fat and Oil"
      ? setFallbackIcon("🧈")
      : data.category === "Egg base products"
      ? setFallbackIcon("🥚")
      : data.category === "Rice"
      ? setFallbackIcon("🍚")
      : data.category === "Vegetables"
      ? setFallbackIcon("🥦")
      : setFallbackIcon("🍕");
  }, [data.category]);

  return (
    <Avatar>
      <AvatarImage src={data.iconUrl} alt="icon" />
      <AvatarFallback>{fallbackIcon}</AvatarFallback>
    </Avatar>
  );
};

export default CellIngredientIcon;

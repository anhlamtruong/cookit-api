"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell_action";

export type MenusColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<MenusColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}></CellAction>,
  },
];

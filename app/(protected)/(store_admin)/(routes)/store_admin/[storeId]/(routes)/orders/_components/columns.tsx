"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell_action";
import { OrderItem } from "@/lib/types/cart_types";

export type OrderColumn = {
  id: string;
  customer: string;
  menu: string;
  quantity: string;
  totalPrice: string;
  createdAt: string;
  isPaid: string;
  email: string;
  note: string;
  orderItems?: {
    menu: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  phone?: string;
  address?: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "menu",
    header: "Menu",
  },
  {
    accessorKey: "customer",
    header: "Customer Name",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },

  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    header: "Info",
    cell: ({ row }) => <CellAction data={row.original}></CellAction>,
  },
];

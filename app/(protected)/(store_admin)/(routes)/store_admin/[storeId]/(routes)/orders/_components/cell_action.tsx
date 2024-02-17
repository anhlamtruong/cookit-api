"use client";

import { Info } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { OrderColumn } from "./columns";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const { orderItems } = data;
  let total = 0;
  return (
    <Popover>
      <PopoverTrigger>
        <span className="sr-only">Open menu</span>
        <Info className="h-4 w-4" />
      </PopoverTrigger>
      <PopoverContent className=" w-96">
        <Table>
          <TableCaption>Break Down Orders</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Menu</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>UnitPrice</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderItems?.map((item) => {
              total += item.totalPrice;
              return (
                <TableRow key={item.menu}>
                  <TableCell className="font-medium">{item.menu}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{`$${item.unitPrice}`}</TableCell>
                  <TableCell className="text-right">{`$${item.totalPrice}`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{`$${total}`}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </PopoverContent>
    </Popover>
  );
};

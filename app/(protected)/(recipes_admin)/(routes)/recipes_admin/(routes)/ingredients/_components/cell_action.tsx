"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash, Info } from "lucide-react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { IngredientsColumn } from "./columns";
import { IngredientModal } from "./ingredient_modal";
import { ClockLoader } from "react-spinners";
import { AlertModal } from "@/components/modals/alert_modal";

interface CellActionProps {
  data: IngredientsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const [openIngredient, setOpenIngredient] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onEdit = async () => {
    try {
      setLoading(true);
      router.push(`/recipes_admin/ingredients/${data.id}`);
    } catch (error) {
      toast.error("Cannot edit ingredient ?");
    } finally {
      setOpenIngredient(false);
      setLoading(false);
    }
  };
  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/admin/ingredients/${data.id}`);
      toast.success("Ingredient deleted.");
      router.refresh();
    } catch (error) {
      toast.error("Cannot delete ingredient.");
    } finally {
      setOpenAlert(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Ingredient ID copied to clipboard.");
  };

  return (
    <>
      <AlertModal
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <IngredientModal
        isOpen={openIngredient}
        onClose={() => setOpenIngredient(false)}
        onConfirm={onEdit}
        loading={loading}
        data={data}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" /> Copy Name
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpenIngredient(true);
            }}
          >
            <Info className="mr-2 h-4 w-4" /> View Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/recipes_admin/ingredients/${data.id}`)}
          >
            {loading && <ClockLoader size={15}></ClockLoader>}
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenAlert(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

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

import { AccountsColumn } from "./columns";
import { ClockLoader } from "react-spinners";
import { AlertModal } from "@/components/modals/alert_modal";
import { useOpenAccount } from "@/hooks/finance/account/use-open-account";
import { useDeleteFinanceAccount } from "@/hooks/finance/accounts/use-delete-account";

interface CellActionProps {
  data: AccountsColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const { onOpen } = useOpenAccount();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteMutation = useDeleteFinanceAccount();

  const onConfirm = async () => {
    try {
      setLoading(true);
      deleteMutation.mutate(
        { id: data.id },
        {
          onSuccess: () => {
            router.refresh();
          },
        }
      );
    } catch (error) {
      toast.error("Cannot delete account.");
    } finally {
      setOpenAlert(false);
      setLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Account ID copied to clipboard.");
  };

  return (
    <>
      <AlertModal
        isOpen={openAlert}
        onClose={() => setOpenAlert(false)}
        onConfirm={onConfirm}
        loading={loading}
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
          <DropdownMenuItem onClick={() => {}}>
            <Info className="mr-2 h-4 w-4" /> View Detail
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              onOpen(data.id);
            }}
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

"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AccountsColumn } from "./columns";

interface AccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: AccountsColumn;
}

export const AccountsModal: React.FC<AccountsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  data,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={data.name}
      description={"To show you what is going on with your ingredient"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className=" pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onConfirm}>
          Edit
        </Button>
      </div>
      <div className="flex content-center items-center gap-2 p-2">
        <p className="text-muted-foreground text-xs">{`Create on ${data.createAt}`}</p>
      </div>
    </Modal>
  );
};

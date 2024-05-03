"use client";

import { Suspense, useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import CellIngredientIcon, { IngredientsColumn } from "./columns";

import Image from "next/image";

interface IngredientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  data: IngredientsColumn;
}

export const IngredientModal: React.FC<IngredientModalProps> = ({
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
      description={
        data.description ?? "To show you what is going on with your ingredient"
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <Suspense fallback={<p className="items-center">Loading Image...</p>}>
        {data.imageUrl && (
          <Image
            placeholder="blur"
            src={data.imageUrl}
            width={100}
            height={100}
            alt={data.name}
            sizes="100"
            loading="lazy"
            blurDataURL={data.imageUrl}
            className="rounded-lg border-2 border-muted-foreground w-full overflow-hidden aspect-square"
          ></Image>
        )}
      </Suspense>
      <div className=" pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onConfirm}>
          Edit
        </Button>
      </div>
      <div className="flex content-center items-center gap-2 p-2">
        <CellIngredientIcon data={data}></CellIngredientIcon>
        <p className="text-muted-foreground text-xs">{`Create on ${data.createAt}`}</p>
      </div>
    </Modal>
  );
};

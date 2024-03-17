"use client";

import { ChefModal } from "@/components/modals/chef_modal";
import { Skeleton } from "@/components/ui/skeleton";

import { useChef } from "@/hooks/store/useChef";
import { useStores } from "@/hooks/store/useStore";
import { useStoreModal } from "@/hooks/store/useStoreModal";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const StoreAdminPage: React.FC = ({}) => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const onClose = useStoreModal((state) => state.onClose);
  const isOpen = useStoreModal((state) => state.isOpen);

  const { data: chefData, isLoading } = useChef();
  const { data: storeData } = useStores();

  const router = useRouter();
  useEffect(() => {
    if (!isOpen && chefData && storeData?.length === 0) {
      onOpen();
    } else {
      onClose();
      storeData
        ? storeData[0]
          ? router.push(`/store_admin/${storeData[0].id}`)
          : onOpen()
        : null;
    }
  }, [chefData, isOpen, onClose, onOpen, router, storeData, storeData?.length]);

  return !chefData ? (
    <div className=" flex flex-col w-screen h-screen self-center justify-center items-center">
      <ChefModal />
    </div>
  ) : !isLoading ? (
    <div>Redirecting to Store</div>
  ) : (
    <Skeleton></Skeleton>
  );
};
export default StoreAdminPage;

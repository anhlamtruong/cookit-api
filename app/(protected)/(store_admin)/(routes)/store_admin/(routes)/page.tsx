"use client";

import { ChefModal } from "@/components/modals/chef_modal";
import { Skeleton } from "@/components/ui/skeleton";

import { useChef } from "@/hooks/store/useChef";
import { useStores } from "@/hooks/store/useStore";
import { useStoreModal } from "@/hooks/store/useStoreModal";
import { useRouter } from "next/navigation";

import React, { Suspense, useEffect } from "react";

const StoreAdminPage: React.FC = ({}) => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const onClose = useStoreModal((state) => state.onClose);
  const isOpen = useStoreModal((state) => state.isOpen);

  const { data: storeData, isLoading } = useStores();

  const router = useRouter();
  useEffect(() => {
    storeData
      ? storeData[0]
        ? router.push(`/store_admin/${storeData[0].id}`)
        : onOpen()
      : null;
  }, [, isOpen, onClose, onOpen, router, storeData, storeData?.length]);

  return isLoading ? (
    <div>Redirecting to Store ...</div>
  ) : (
    <Skeleton></Skeleton>
  );
};
export default StoreAdminPage;

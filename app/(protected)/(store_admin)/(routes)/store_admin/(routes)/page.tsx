"use client";

import { Store } from "@/generated/mysql/@prisma-client-mysql";
import useAsyncDataFetcher from "@/hooks/store/useAsyncDataFetcher";
import { useStoreModal } from "@/hooks/store/useStoreModal";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

const StoreAdminPage: React.FC = ({}) => {
  const onOpen = useStoreModal((state) => state.onOpen);
  const onClose = useStoreModal((state) => state.onClose);
  const isOpen = useStoreModal((state) => state.isOpen);
  const { data, isLoading, error } =
    useAsyncDataFetcher<Store>("api/admin/store");

  const router = useRouter();
  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
    if (data?.id) {
      onClose();
      router.push(`/store_admin/${data.id}`);
    }
  }, [data?.id, isOpen, onClose, onOpen, router]);

  return <div>ADMIN</div>;
};
export default StoreAdminPage;

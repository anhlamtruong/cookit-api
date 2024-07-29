"use client";

import { StoreModal } from "@/components/modals/store_modal";
import { useMountedState } from "react-use";

export const ModalProvider = () => {
  const isMounted = useMountedState();
  if (!isMounted) return null;

  return (
    <>
      <StoreModal />
    </>
  );
};

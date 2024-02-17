"use client";
import { ModalProvider } from "@/providers/modal_provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ModalProvider />
        {children}
      </QueryClientProvider>
    </>
  );
};

export default AdminLayout;

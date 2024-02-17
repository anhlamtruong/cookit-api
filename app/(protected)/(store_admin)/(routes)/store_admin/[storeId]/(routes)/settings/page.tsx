"use client";

import ErrorComponent from "@/components/ui/error";
import SettingsForm from "./_components/settings_form";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useStoreData from "@/hooks/store/useStore";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const AdminSettingPage: React.FC<SettingsPageProps> = ({ params }) => {
  const { storeData } = useStoreData();
  const router = useRouter();
  useEffect(() => {
    if (!storeData) {
      router.push("/store_admin");
    }
  }, [router, storeData]);

  return storeData ? (
    <div className=" flex-col">
      <div className=" flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialDataStore={storeData} />
      </div>
    </div>
  ) : null;
};

export default AdminSettingPage;

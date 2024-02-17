"use client";

import { useStores } from "@/hooks/store/useStore";
import { cn } from "@/lib/utils";
import MainNavigationBar from "./admin_main_navigation_bar";
import StoreSwitcher from "./store-switcher";
import { UserButton } from "@/components/auth/user_button";

interface NavigationBarProps {
  className: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  className = "",
}) => {
  // const { data: storesData } = useAsyncDataFetcher<Store[]>("/api/stores");
  const { data: stores, isLoading } = useStores();

  return (
    <div className={cn(" border-b", { className })}>
      <div className="flex h-auto items-center px-4">
        <div className="p-2 mr-auto flex items-center space-x-4 justify-center content-center">
          {/* //TODO: Add redirect whenever signing out */}
          <UserButton></UserButton>
        </div>
        <div className="flex gap-3">
          <MainNavigationBar></MainNavigationBar>
          <StoreSwitcher items={stores ?? []} />
        </div>
      </div>
    </div>
  );
};

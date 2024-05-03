"use client";

import { cn } from "@/lib/utils";
import MainNavigationBar from "./recipes_navigation_bar";
import { UserButton } from "@/components/auth/user_button";

interface NavigationBarProps {
  className?: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  className = "",
}) => {
  return (
    <div className={cn(" border-b", { className })}>
      <div className="flex h-auto items-center px-4">
        <div className="p-2 mr-auto flex items-center space-x-4 justify-center content-center">
          {/* //TODO: Add redirect whenever signing out */}
          <UserButton></UserButton>
        </div>
        <div className="flex gap-3">
          <MainNavigationBar></MainNavigationBar>
        </div>
      </div>
    </div>
  );
};

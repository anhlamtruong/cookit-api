"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MainNavigationBar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  const recipes_routes = [
    {
      href: `/recipes_admin/ingredients`,
      label: "Ingredients",
      active: pathname === `/recipes_admin/ingredients`,
    },
    {
      href: `/recipes_admin/recipes`,
      label: "Recipes",
      active: pathname === `/recipes_admin/recipes`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6")}>
      {recipes_routes.map((route) => {
        return (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              " text-sm font-medium transition-colors hover:text-primary",
              route.active
                ? "text-black dark:text-white "
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNavigationBar;

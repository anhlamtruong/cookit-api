"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

const MainNavigationBar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const routes = [
    {
      href: `/recipes/${params.recipeId}`,
      label: "Overview",
      active: pathname === `/recipes/${params.recipeId}`,
    },
    {
      href: `/recipes/${params.recipeId}/billboards`,
      label: "Billboards",
      active: pathname === `/recipes/${params.recipeId}/billboards`,
    },
    {
      href: `/recipes/${params.recipeId}/categories`,
      label: "Categories",
      active: pathname === `/recipes/${params.recipeId}/categories`,
    },
    {
      href: `/recipes/${params.recipeId}/sizes`,
      label: "Sizes",
      active: pathname === `/recipes/${params.recipeId}/sizes`,
    },
    {
      href: `/recipes/${params.recipeId}/menus`,
      label: "Menus",
      active: pathname === `/recipes/${params.recipeId}/menus`,
    },
    {
      href: `/recipes/${params.recipeId}/orders`,
      label: "Orders",
      active: pathname === `/recipes/${params.recipeId}/orders`,
    },
    {
      href: `/recipes/${params.recipeId}/settings`,
      label: "Settings",
      active: pathname === `/recipes/${params.recipeId}/settings`,
    },
    {
      href: `/recipes/${params.recipeId}/chef`,
      label: "Chef",
      active: pathname === `/recipes/${params.recipeId}/chef`,
    },
    {
      href: `/store_admin`,
      label: "Stores",
      active: pathname === `/store_admin`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6")}>
      {routes.map((route) => {
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

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const MainNavigationBar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/store_admin/${params.storeId}`,
      label: "Overview",
      active: pathname === `/store_admin/${params.storeId}`,
    },
    {
      href: `/store_admin/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/store_admin/${params.storeId}/billboards`,
    },
    {
      href: `/store_admin/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/store_admin/${params.storeId}/categories`,
    },
    {
      href: `/store_admin/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/store_admin/${params.storeId}/sizes`,
    },
    {
      href: `/store_admin/${params.storeId}/menus`,
      label: "Menus",
      active: pathname === `/store_admin/${params.storeId}/menus`,
    },
    {
      href: `/store_admin/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/store_admin/${params.storeId}/orders`,
    },
    {
      href: `/store_admin/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/store_admin/${params.storeId}/settings`,
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

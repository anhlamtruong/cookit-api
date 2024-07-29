"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useMedia } from "react-use";

const MainNavigationBar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false);
  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };
  const store_routes = [
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
    {
      href: `/store_admin/${params.storeId}/chef`,
      label: "Chef",
      active: pathname === `/store_admin/${params.storeId}/chef`,
    },
  ];
  return (
    <>
      {isMobile && (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger>
            <div className="font-normal transition border-none border border-input bg-background hover:bg-accent hover:text-accent-foreground">
              <Menu className=" size-6"></Menu>
            </div>
          </SheetTrigger>
          <SheetContent side="right" className="px-2">
            <nav className="flex flex-col gap-y-2 pt-6">
              {store_routes.map((route: any) => {
                return (
                  <Button
                    key={route.href}
                    onClick={() => onClick(route.href)}
                    variant={route.active ? "outline" : "ghost"}
                    className={cn(
                      " w-full justify-end hover:bg-opacity-95",
                      route.active ?? "bg-muted-foreground"
                    )}
                  >
                    {route.label}
                  </Button>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      )}
      {!isMobile && (
        <div className={cn("flex items-center space-x-4 lg:space-x-6")}>
          {store_routes.map((route: any) => {
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "w-full lg:w-auto text-sm font-medium transition-colors hover:text-primary",
                  route.active
                    ? "text-black dark:text-white "
                    : "text-muted-foreground"
                )}
              >
                {route.label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MainNavigationBar;

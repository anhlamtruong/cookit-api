"use client";
import React, { Suspense, useState } from "react";

import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const LinkNavigationBar = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);
  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };
  const finance_routes = [
    {
      href: `/finance`,
      label: "Overview",
      active: pathname === `/finance`,
    },
    {
      href: `/finance/transactions`,
      label: "Transactions",
      active: pathname === `/finance/transactions`,
    },
    {
      href: `/finance/accounts`,
      label: "Accounts",
      active: pathname === `/finance/accounts`,
    },
    {
      href: `/finance/categories`,
      label: "Categories",
      active: pathname === `/finance/categories`,
    },
    {
      href: `/finance/settings`,
      label: "Settings",
      active: pathname === `/finance/settings`,
    },
  ];

  return (
    <>
      <Suspense fallback={<p>loading</p>}>
        {isMobile && (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
              <div className="font-normal transition border-none border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                <Menu className=" size-6"></Menu>
              </div>
            </SheetTrigger>
            <SheetContent side="right" className="px-2">
              <nav className="flex flex-col gap-y-2 pt-6">
                {finance_routes.map((route: any) => {
                  return (
                    <Button
                      key={route.href}
                      onClick={() => onClick(route.href)}
                      variant={route.active ? "outline" : "ghost"}
                      className={cn(
                        " w-full justify-end",
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
            {finance_routes.map((route: any) => {
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
      </Suspense>
    </>
  );
};

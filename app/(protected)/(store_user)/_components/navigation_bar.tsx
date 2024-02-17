"use client";
import Link from "next/link";
import { Container } from "./container";
import MainNav from "./main_navigation_bar";
import { Category } from "@/generated/mysql/@prisma-client-mysql";
import useAsyncDataFetcher from "@/hooks/store/useAsyncDataFetcher";
import useOrigin from "@/hooks/store/use_origin";
import NavbarActions from "./navigation_bar_action";

export const revalidate = 0;

const NavigationBar = () => {
  const url = useOrigin();
  const { data, isLoading } = useAsyncDataFetcher<Category[]>(
    `${url}/api/user_store/categories`
  );
  const categories = data;
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/store_user" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">STORE</p>
          </Link>
          <MainNav data={categories!} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default NavigationBar;

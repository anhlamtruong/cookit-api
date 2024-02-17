"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { MenusColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data_table";
import { ApiList } from "@/components/ui/api_list";
interface MenusClientProps {
  data: MenusColumn[];
}

export const MenusClient: React.FC<MenusClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Menus (${data.length})`}
          description="Manage menus for your store"
        />
        <Button
          onClick={() =>
            router.push(`/store_admin/${params.storeId}/menus/new`)
          }
        >
          <Plus className=" mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"name"} columns={columns} data={data} />
      <Heading title="API" description="API Calls for Menus" />
      <Separator />
      <ApiList entityName="menus" entityIdName="menuId" />
    </>
  );
};

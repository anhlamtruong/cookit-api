"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data_table";
import { ApiList } from "@/components/ui/api_list";
interface BillboardsClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() =>
            router.push(`/store_admin/${params.storeId}/billboards/new`)
          }
        >
          <Plus className=" mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey={"label"} columns={columns} data={data} />
      <Heading title="API" description="API Calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
};

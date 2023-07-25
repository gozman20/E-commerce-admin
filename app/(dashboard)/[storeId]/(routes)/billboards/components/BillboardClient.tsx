"use client";
import React from "react";
import Heading from "../../../../../../components/ui/Heading";
import { Button } from "../../../../../../components/ui/button";
import { Plus } from "lucide-react";
import { Separator } from "../../../../../../components/ui/separator";
import { useParams, useRouter } from "next/navigation";
import { Billboard } from "@prisma/client";
import { BillboardColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/DataTable";

interface BillboardClientProps {
  data?: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data = [] }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard ${data.length}`}
          description="Manage billboard of your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
    </>
  );
};

export default BillboardClient;

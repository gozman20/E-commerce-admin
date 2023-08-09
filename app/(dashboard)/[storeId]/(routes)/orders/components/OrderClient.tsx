"use client";
import React from "react";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { OrderColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/DataTable";

interface OrderClientProps {
  data?: OrderColumn[];
}

const BillboardClient: React.FC<OrderClientProps> = ({ data = [] }) => {
  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders of your store"
      />

      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  );
};

export default BillboardClient;

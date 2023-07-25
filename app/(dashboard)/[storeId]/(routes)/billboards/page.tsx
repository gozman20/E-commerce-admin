import BillboardClient from "./components/BillboardClient";
import React from "react";
import { format } from "date-fns";

const Billboard = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prisma?.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboard = billboards?.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  );
};

export default Billboard;

import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import Nabvar from "@/components/Nabvar";

const DashboardLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) => {
  const { userId } = auth();
  const { storeId } = params;
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: { id: storeId, userId },
  });

  if (!store) redirect("/");
  return (
    <>
      <Nabvar />
      {children}
    </>
  );
};

export default DashboardLayout;

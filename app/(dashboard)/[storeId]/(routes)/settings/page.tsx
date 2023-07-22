import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { SettingsForm } from "./components/SettingsForm";

interface SettinsPageprops {
  params: { storeId: string };
}
const Settingspage: React.FC<SettinsPageprops> = async ({ params }) => {
  const { userId } = auth();
  const { storeId } = params;
  if (!userId) redirect("/sign-in");

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  if (!store) redirect("/");
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <SettingsForm initialData={store} />
    </div>
  );
};

export default Settingspage;

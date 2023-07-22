"use client";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Store } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import * as z from "zod";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import AlertModal from "@/components/modals/AlertModal";

interface SettingsFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});
type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const { storeId } = params;

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      await axios.patch(`/api/stores/${storeId}`, data);
      router.refresh();
      toast.success("Store updated");
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/stores/${storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store Deleted");
    } catch (err) {
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={form.formState.isSubmitting}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          disabled={form.formState.isSubmitting}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="ml-auto"
          >
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

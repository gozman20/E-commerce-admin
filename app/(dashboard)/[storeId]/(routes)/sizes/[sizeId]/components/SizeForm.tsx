"use client";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Size } from "@prisma/client";
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
import { ApiAlert } from "@/components/ui/Api-alert";
import { useOrigin } from "@/hooks/useOrigin";
import ImageUpload from "@/components/ui/ImageUpload";
import { url } from "inspector";

interface SizeFormProps {
  initialData: Size | null;
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});
type SizeFormValues = z.infer<typeof formSchema>;

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  console.log(params);
  const { storeId, billboardId, sizeId } = params;

  const title = initialData ? "Edit size" : "Create size";
  const description = initialData ? "Edit a size" : "Add a new size";
  const toastMessage = initialData ? "Size edited" : "Size created";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || { name: "", value: "" },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      if (initialData) {
        await axios.patch(`/api/${storeId}/sizes/${sizeId}`, data);
      } else {
        await axios.post(`/api/${storeId}/sizes`, data);
      }
      router.refresh();
      router.push(`/${params.storeId}/sizes`);

      toast.success(toastMessage);
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async () => {
    try {
      await axios.delete(`/api/${storeId}/sizes/${sizeId}`);
      router.refresh();
      router.push(`/${storeId}/sizes`);
      toast.success("Size Deleted");
    } catch (err) {
      toast.error("Make sure you removed all productd using this size first.");
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
        onCancel={() => setOpen(false)}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={form.formState.isSubmitting}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
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
                      placeholder="Size name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="Size value"
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
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

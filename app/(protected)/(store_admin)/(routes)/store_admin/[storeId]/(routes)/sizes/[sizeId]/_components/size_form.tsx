"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { toast } from "sonner";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert_modal";
import ImageUpload from "@/components/ui/image_upload";
import { Billboard, Size } from "@/generated/mysql/@prisma-client-mysql";

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeForm {
  initialDataSize: Size | null | undefined;
}
export const SizeForm: React.FC<SizeForm> = ({ initialDataSize }) => {
  const params = useParams();
  const router = useRouter();

  const title = initialDataSize ? "Edit Size" : "Create Size";
  const description = initialDataSize ? "Edit Size" : "Add a new Size";
  const toastMessage = initialDataSize
    ? "Size updated! Redirecting to Sizes Page"
    : "Size created! Redirecting to Sizes Page";
  const action = initialDataSize ? "Save changes" : "Create";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialDataSize || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (initialDataSize) {
        (await axios.patch(
          `/api/admin/${params.storeId}/sizes/${params.sizeId}`,
          data
        )) as Size;
      } else {
        (await axios.post(`/api/admin/${params.storeId}/sizes`, data)) as Size;
      }
      // setStoreData(newStore);
      router.push(`/store_admin/${params.storeId}/sizes`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/admin/${params.storeId}/sizes/${params.sizeId}`);

      router.refresh();
      router.push(`/store_admin/${params.storeId}/sizes`);
      toast.arguments("SUCCESSFULLY DELETED SIZE");
    } catch (error) {
      console.error(error);
      toast.error("Make sure you removed all menus using this size first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      ></AlertModal>
      <div className=" flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialDataSize && (
          <Button
            disabled={loading}
            variant="destructive"
            size={"sm"}
            onClick={() => setOpen(true)}
          >
            <Trash className=" h-4 w-4"></Trash>
          </Button>
        )}
      </div>
      <Separator></Separator>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Name (*)`}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
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
                  <FormLabel>{`Value (*)`}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Size value"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className=" ml-auto" type="submit">
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

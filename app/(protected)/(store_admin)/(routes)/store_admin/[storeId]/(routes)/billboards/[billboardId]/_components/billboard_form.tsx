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
import { Billboard } from "@/generated/mysql/@prisma-client-mysql";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardForm {
  initialDataBillboard: Billboard | null | undefined;
}
const BillboardForm: React.FC<BillboardForm> = ({ initialDataBillboard }) => {
  const params = useParams();
  const router = useRouter();

  const title = initialDataBillboard ? "Edit Billboard" : "Create Billboard";
  const description = initialDataBillboard
    ? "Edit Billboard"
    : "Add a new Billboard";
  const toastMessage = initialDataBillboard
    ? "Billboard updated! Redirecting to Billboards Page"
    : "Billboard created! Redirecting to Billboards Page";
  const action = initialDataBillboard ? "Save changes" : "Create";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialDataBillboard || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      if (initialDataBillboard) {
        const newBillboard = (await axios.patch(
          `/api/admin/${params.storeId}/billboards/${params.billboardId}`,
          data
        )) as Billboard;
      } else {
        const newBillboard = (await axios.post(
          `/api/admin/${params.storeId}/billboards`,
          data
        )) as Billboard;
      }
      // setStoreData(newStore);
      router.push(`/store_admin/${params.storeId}/billboards`);
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
      await axios.delete(
        `/api/admin/${params.storeId}/billboards/${params.billboardId}`
      );

      router.refresh();
      router.push(`/store_admin/${params.storeId}/billboards`);
      toast.arguments("SUCCESSFULLY DELETED BILLBOARD");
    } catch (error) {
      console.error(error);
      toast.error(
        "Make sure you removed all categories using this billboard first."
      );
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
        {initialDataBillboard && (
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
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{`Background Image (*)`}</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{`Label (*)`}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
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

export default BillboardForm;

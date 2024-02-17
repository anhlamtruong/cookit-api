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
import { Billboard, Category } from "@/generated/mysql/@prisma-client-mysql";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryForm {
  initialDataCategory: Category | null | undefined;
  initialDataBillboards: Billboard[];
}
export const CategoryForm: React.FC<CategoryForm> = ({
  initialDataCategory,
  initialDataBillboards,
}) => {
  const params = useParams();
  const router = useRouter();
  const billboards = initialDataBillboards;
  const title = initialDataCategory ? "Edit Categories" : "Create Categories";
  const description = initialDataCategory
    ? "Edit Categories"
    : "Add a new Categories";
  const toastMessage = initialDataCategory
    ? "Categories updated! Redirecting to Categories Page"
    : "Categories created! Redirecting to Categories Page";
  const action = initialDataCategory ? "Save changes" : "Create";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialDataCategory || {
      name: "",
      billboardId: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialDataCategory) {
        (await axios.patch(
          `/api/admin/${params.storeId}/categories/${params.categoryId}`,
          data
        )) as Category;
      } else {
        (await axios.post(
          `/api/admin/${params.storeId}/categories`,
          data
        )) as Category;
      }
      router.push(`/store_admin/${params.storeId}/categories`);
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
        `/api/admin/${params.storeId}/categories/${params.categoryId}`
      );

      router.refresh();
      router.push(`/store_admin/${params.storeId}/categories`);
      toast.arguments("SUCCESSFULLY DELETED CATEGORY");
    } catch (error) {
      console.error(error);
      toast.error("Make sure you removed all menus using this category first.");
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
        {initialDataCategory && (
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
                  <FormLabel>Name (*)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a billboard"
                        ></SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

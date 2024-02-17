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
import useStoreData from "@/hooks/store/useStore";
import { AlertModal } from "@/components/modals/alert_modal";
import { ApiAlert } from "@/components/ui/api_alert";
import useOrigin from "@/hooks/store/use_origin";
import { Store } from "@/generated/mysql/@prisma-client-mysql";
import ImageUpload from "@/components/ui/image_upload";
interface SettingsForm {
  initialDataStore: Store;
}
const formSchema = z.object({
  name: z.string().min(1),
  imageUrl: z.optional(z.string()),
});
type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingsForm> = ({ initialDataStore }) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const [open, setOpen] = useState(false);
  const { setStoreData, removeStoreData } = useStoreData();
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: !initialDataStore
      ? initialDataStore
      : {
          name: initialDataStore.name,
          imageUrl: "",
        },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      const newStore = (await axios.patch(
        `/api/admin/${params.storeId}`,
        data
      )) as Store;
      setStoreData(newStore);
      router.refresh();

      toast.success("Successfully updated store");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/admin/${params.storeId}`);
      removeStoreData();
      toast.success("SUCCESSFULLY DELETED STORE");
    } catch (error) {
      toast.error("Make sure you removed all products and categories first.");
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
        <Heading title="Settings" description="Manage Store Preferences" />
        <Button
          disabled={loading}
          variant="destructive"
          size={"sm"}
          onClick={() => setOpen(true)}
        >
          <Trash className=" h-4 w-4"></Trash>
        </Button>
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Cookit-Store"
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
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/admin/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;

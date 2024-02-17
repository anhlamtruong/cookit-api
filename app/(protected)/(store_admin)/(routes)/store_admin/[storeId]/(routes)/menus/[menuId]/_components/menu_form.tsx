"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
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
import {
  Menu,
  Image,
  Category,
  Size,
} from "@/generated/mysql/@prisma-client-mysql";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  pickupDate: z.date({
    required_error: "A date to pick up is required.",
  }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type MenuFormValues = z.infer<typeof formSchema>;

interface MenuForm {
  initialDataMenu: (Menu & { images: Image[] }) | null | undefined;
  categories: Category[];

  sizes: Size[];
}
export const MenuForm: React.FC<MenuForm> = ({
  initialDataMenu,
  categories,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();

  const title = initialDataMenu ? "Edit Menu" : "Create Menu";
  const description = initialDataMenu ? "Edit Menu" : "Add a new Menu";
  const toastMessage = initialDataMenu
    ? "Menu updated! Redirecting to Menus Page"
    : "Menu created! Redirecting to Menus Page";
  const action = initialDataMenu ? "Save changes" : "Create";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialDataMenu
      ? {
          ...initialDataMenu,
          price: parseFloat(String(initialDataMenu?.price)),
          pickupDate: initialDataMenu?.pickupDate ?? undefined,
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          sizeId: "",
          isFeatured: false,
          isArchived: false,
          pickupDate: new Date(),
        },
  });

  const onSubmit = async (data: MenuFormValues) => {
    try {
      setLoading(true);
      if (initialDataMenu) {
        (await axios.patch(
          `/api/admin/${params.storeId}/menus/${params.menuId}`,
          data
        )) as Menu;
      } else {
        (await axios.post(`/api/admin/${params.storeId}/menus`, data)) as Menu;
      }

      router.push(`/store_admin/${params.storeId}/menus`);
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
      await axios.delete(`/api/admin/${params.storeId}/menus/${params.menuId}`);

      router.refresh();
      router.push(`/store_admin/${params.storeId}/menus`);
      toast.arguments("SUCCESSFULLY DELETED MENU");
    } catch (error) {
      console.error(error);
      toast.error(
        "Make sure you removed all categories using this menus first."
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
        {initialDataMenu && (
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
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
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
                  <FormLabel>{`Name (*)`}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Menu name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="9.99"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
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
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
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
                          placeholder="Select a size/portion"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This menu will not appear anywhere in the store.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pickupDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Pick Up Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={loading}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Choose the date when your customer can pick your food up{" "}
                  </FormDescription>
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

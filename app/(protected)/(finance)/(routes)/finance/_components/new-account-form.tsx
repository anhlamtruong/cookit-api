import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading, SecondHeading } from "@/components/ui/heading";
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

import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { toast } from "sonner";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert_modal";

import { IconPickerFirebase } from "@/components/ui/firebase/icon_picker";
import { ImageSearcher } from "@/components/ui/firebase/image_searcher";
import ImageUpload from "@/components/ui/image_upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Ingredients } from "@/lib/types/ingredients_types";
import { Measurement } from "@/lib/types/measurement_types";
import { Textarea } from "@/components/ui/textarea";

// Define a schema for a single ingredient
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // measurement: z.string({
  //   required_error: "Please choose a measurement for this ingredient",
  // }),
  // source: z.string(),
  // category: z.string({
  //   required_error: "Please choose a category for this ingredient",
  // }),
  // description: z.string().optional(),
  // imageURL: z.string().optional(),
  // iconURL: z.string().optional(),
});
export type FormValues = z.infer<typeof formSchema>;
type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit?: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const NewAccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {name: ""},
  });
  const action = id ? "Save changes" : "Create account";

  const handleSubmit = (values: FormValues) => {
    onSubmit?.(values);
  };
  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          control={form.control}
          name={`name`}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name(*)</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="e.g. Cash, Bank, Credit Card"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="leading-tight">
                  Name of your account
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button disabled={loading} className="w-full ml-auto" type="submit">
          {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          {action}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={loading}
            className="w-full ml-auto flex gap-2 items-center justify-center"
            onClick={handleDelete}
            variant={"outline"}
          >
            <Trash className="size-4" />
            <span>Delete account</span>
          </Button>
        )}
      </form>
    </Form>
  );
};

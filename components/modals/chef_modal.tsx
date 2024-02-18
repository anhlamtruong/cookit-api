"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Modal from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useCreateStore } from "@/hooks/store/useStore";
import { FormError } from "../form_error";
import { Separator } from "../ui/separator";
import { ImageWithDescriptionUpload } from "../ui/image_with_description_upload";
import { useChef } from "@/hooks/store/useChef";
import { settings } from "@/actions/settings";

const formSchema = z.object({
  bio: z.string().max(500),
  images: z
    .object({ url: z.string(), description: z.optional(z.string()) })
    .array(),
});

export const ChefModal = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: "",
      images: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setError("");
      setLoading(true);
      const response = await axios.post("/api/admin/chef", values);
      if (response.status === 200) {
        toast.success("Success Creating Chef!");
        settings;
        router.refresh();
      } else {
        toast.error("Something went wrong :(, please try again");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 py-2 pb-4 w-3/4 h-full">
      <div className="space-y-2 h-full">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 h-full "
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description on Your Bio</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="My name is Cookit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator></Separator>
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <ImageWithDescriptionUpload
                        values={field.value.map((images) => images)}
                        disabled={loading}
                        onChange={(newValues) => field.onChange(newValues)}
                        onRemove={(urlToRemove) =>
                          field.onChange([
                            ...field.value.filter(
                              (image) => image.url !== urlToRemove
                            ),
                          ])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormError message={error}></FormError>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button disabled={loading} type="submit">
                Confirm Bio Change
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

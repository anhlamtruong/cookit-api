"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
import { FormError } from "../form_error";
import { Separator } from "../ui/separator";
import { ImageWithDescriptionUpload } from "../ui/image_with_description_upload";
import { settings } from "@/actions/settings";
import { useChef } from "@/hooks/store/useChef";
import { BeatLoader } from "react-spinners";

const formSchema = z.object({
  bio: z.string().max(500),
  images: z
    .object({ url: z.string(), description: z.optional(z.string()) })
    .array(),
});

export const ChefModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("isPreview");

  const [error, setError] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const { data: dataChef, isLoading: isLoadingChef } = useChef();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: dataChef
      ? {
          bio: dataChef.bio ?? undefined,
          images: dataChef.profilePictures
            ? dataChef.profilePictures.map((pic) => ({
                url: pic.url,
                description:
                  pic.description !== null ? pic.description : undefined,
              }))
            : [],
        }
      : { bio: "", images: [] },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (!isPreview) {
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
      } else {
        setError("");
        setLoading(true);
        const response = await axios.patch("/api/admin/chef", {
          ...values,
          chefId: dataChef?.id,
        });
        if (response.status === 200) {
          toast.success("Success Update Chef!");
          settings;
          router.refresh();
        } else {
          toast.error("Something went wrong :(, please try again");
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 py-2 pb-4 w-full h-full ">
      <div className="space-y-2 h-full">
        <Form {...form}>
          <form
            className="flex flex-col gap-4 h-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col space-y-2">
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Short Description on Your Bio
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-md border-gray-300 focus:border-blue-500"
                        disabled={loading}
                        placeholder="My name is Cookit"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-gray-500">
                      Max 500 characters
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
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
            <div className="flex flex-col space-y-2"></div>
            <FormError message={error}></FormError>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button disabled={loading} type="submit">
                {loading ? (
                  <BeatLoader color="white" size={8} />
                ) : (
                  "Confirm Bio Change"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

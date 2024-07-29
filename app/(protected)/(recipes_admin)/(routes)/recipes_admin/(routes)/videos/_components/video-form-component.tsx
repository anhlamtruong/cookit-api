"use client";

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
const videoSchema = z.object({
  title: z.string().min(1, "Name is required"),
  category: z.string({
    required_error: "Please choose a category for this video",
  }),
  location: z.string(),
  language: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  visibility: z.enum(["Public", "Private", "Unlisted"]),
});

type VideoFormValues = z.infer<typeof videoSchema>;

interface VideoForm {
  initialDataVideo: VideoFormValues | null | undefined;
}
export const VideoForm: React.FC<VideoForm> = ({ initialDataVideo }) => {
  const params = useParams();
  const router = useRouter();

  const title = initialDataVideo ? "Edit Video" : "Create Video";
  const description = initialDataVideo
    ? "Edit Video Meta Data"
    : "Upload a new Video";
  const toastMessage = initialDataVideo ? "Video updated!" : "Video created!";
  const action = initialDataVideo ? "Updated Video's Metadata" : "Upload Video";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    defaultValues: initialDataVideo
      ? initialDataVideo
      : {
          title: "",
          visibility: "Private",
          category: "",
          location: "",
          language: "",
          description: "",
          tags: [],
          videoUrl: "",
          thumbnailUrl: "",
        },
  });

  const onSubmit = async (data: VideoFormValues) => {
    try {
      setLoading(true);
      if (initialDataVideo) {
        await axios.patch(`/api/admin/videos/${params.ingredientId}`, data);
      } else {
        await axios.post(`/api/admin/videos`, {
          ...data,
        });
      }
      toast.success(toastMessage);
      router.back();
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/admin/ingredients/${params.ingredientId}`);

      router.refresh();
      router.push(`/recipes_admin/ingredients`);
      toast.success("SUCCESSFULLY DELETED INGREDIENT");
    } catch (error) {
      console.error(error);
      toast.error("Cannot delete ingredient. Please try again later");
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
      <div className=" text-foreground flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialDataVideo && (
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
          className="text-foreground p-4 space-y-8 w-full overflow-y-auto overflow-auto"
        >
          <SecondHeading
            title={`Ingredient ${initialDataVideo?.title}`}
          ></SecondHeading>
          <div className=" -mt-8 relative gap-4 items-start content-start justify-start grid grid-cols-2 p-8">
            <FormField
              control={form.control}
              name={`title`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Title(*)</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Video title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="leading-tight">
                      Name of your ingredient
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={`category`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Category(*)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category for your ingredient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(Ingredients).map((key) => (
                          <SelectItem
                            value={Ingredients[key as keyof typeof Ingredients]}
                            key={key}
                          >
                            {Ingredients[key as keyof typeof Ingredients]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription className="leading-tight">
                      Category for your ingredient for a quick sort
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* <FormField
              control={form.control}
              name={``}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Measurement(*)</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a measurement for your ingredient" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.keys(Measurement).map((key) => (
                            <SelectItem
                              value={
                                Measurement[key as keyof typeof Measurement]
                              }
                              key={key}
                            >
                              {Measurement[key as keyof typeof Measurement]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="leading-tight">
                      Is your ingredient measure by cup ? or by pound ?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
           */}
            {/* <FormField 
              control={form.control}
              name={`source`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Source(*)</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Source"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="leading-tight">
                      Please let us know where did you get the ingredient
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
            <FormField
              control={form.control}
              name={`description`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your ingredient description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="leading-tight">
                      {" "}
                      A quick description to help everyone know where to get
                      this ingredient, or how to cook it.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={`thumbnailUrl`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <div>
                        <ImageUpload
                          id={`ingredients.imageURL.search`}
                          value={field.value ? [field.value] : []}
                          onChange={(url) => {
                            field.onChange(url);
                          }}
                          onRemove={() => {
                            field.onChange("");
                          }}
                          disabled={loading}
                        ></ImageUpload>
                        <ImageSearcher
                          showSelectedImage={false}
                          value={field.value ?? ""}
                          id={`ingredients.imageURL.search`}
                          onImageSelect={(url: string) => {
                            field.onChange(url);
                          }}
                          onRemove={() => {
                            field.onChange("");
                          }}
                          disable={loading}
                        ></ImageSearcher>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name={`videoUrl`}
              render={({ field }) => (
                <FormItem className="flex flex-col mt-5 ">
                  <FormLabel htmlFor={`videoUrl`}>
                    Select Icon For Your Ingredient
                  </FormLabel>
                  <FormControl className="w-1/2">
                    <IconPickerFirebase
                      id={`videoUrl`}
                      onIconSelect={(svgURL: string) => field.onChange(svgURL)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator></Separator>
          <Button disabled={loading} className=" ml-auto" type="submit">
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

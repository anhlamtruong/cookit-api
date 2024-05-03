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
const ingredientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  measurement: z.string({
    required_error: "Please choose a measurement for this ingredient",
  }),
  source: z.string(),
  category: z.string({
    required_error: "Please choose a category for this ingredient",
  }),
  description: z.string().optional(),
  imageURL: z.string().optional(),
  iconURL: z.string().optional(),
});
// Update your form schema to include an array of ingredients
const formSchema = z.object({
  ingredient: ingredientSchema,
});

type IngredientsFormValues = z.infer<typeof formSchema>;

interface IngredientForm {
  initialDataIngredient: Ingredient | null | undefined;
}
export const IngredientForm: React.FC<IngredientForm> = ({
  initialDataIngredient,
}) => {
  const params = useParams();
  const router = useRouter();

  const title = initialDataIngredient ? "Edit Ingredient" : "Add Ingredient";
  const description = initialDataIngredient
    ? "Edit Ingredient"
    : "Add a new Ingredient";
  const toastMessage = initialDataIngredient
    ? "Ingredient updated!"
    : "Ingredient created!";
  const action = initialDataIngredient
    ? "Updated Ingredients"
    : "Upload Ingredients";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<IngredientsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialDataIngredient
      ? {
          ingredient: initialDataIngredient,
        }
      : {
          ingredient: {
            name: "",
            category: "",
            measurement: "",
            source: "",
            description: "",
            imageURL: "",
            iconURL: "",
          },
        },
  });

  const onSubmit = async (data: IngredientsFormValues) => {
    try {
      setLoading(true);
      if (initialDataIngredient) {
        await axios.patch(
          `/api/admin/ingredients/${params.ingredientId}`,
          data
        );
      } else {
        await axios.post(`/api/admin/ingredients`, {
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
        {initialDataIngredient && (
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
            title={`Ingredient ${initialDataIngredient?.name}`}
          ></SecondHeading>
          <div className=" -mt-8 relative gap-4 items-start content-start justify-start grid grid-cols-2 p-8">
            <FormField
              control={form.control}
              name={`ingredient.name`}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name(*)</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Ingredient name"
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
              name={`ingredient.category`}
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
            <FormField
              control={form.control}
              name={`ingredient.measurement`}
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
            <FormField
              control={form.control}
              name={`ingredient.source`}
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
            />
            <FormField
              control={form.control}
              name={`ingredient.description`}
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
              name={`ingredient.imageURL`}
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
              name={`ingredient.iconURL`}
              render={({ field }) => (
                <FormItem className="flex flex-col mt-5 ">
                  <FormLabel htmlFor={`ingredient.iconURL`}>
                    Select Icon For Your Ingredient
                  </FormLabel>
                  <FormControl className="w-1/2">
                    <IconPickerFirebase
                      id={`ingredient.iconURL`}
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

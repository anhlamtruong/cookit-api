"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Heading, SecondHeading } from "@/components/ui/heading";
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

import { Plus, Trash } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { toast } from "sonner";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert_modal";
import {
  Category,
  Size,
} from "@/generated/cookit-ecommerce-service/@prisma-client-cookit-ecommerce-service";

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

// Define a schema for a single ingredient
const ingredientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  measurement: z.string(),
  source: z.string(),
  category: z.string({
    required_error: "Please choose a category for this ingredient",
  }),
  isKeyIngredient: z.boolean().default(false),
  groceryStore: z.string().optional(),
  description: z.string().optional(),
  imageURL: z.string().url().optional(),
  iconURL: z.string().url().optional(),
});
// Update your form schema to include an array of ingredients
const formSchema = z.object({
  ingredients: z.array(ingredientSchema),
});

type IngredientFormValues = z.infer<typeof formSchema>;

interface IngredientForm {
  initialDataIngredient: Ingredient[] | null | undefined;
  categories: Category[];
  sizes: Size[];
}
export const IngredientForm: React.FC<IngredientForm> = ({
  initialDataIngredient,
  categories,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();
  const [hasImageUploaded, setHasImageUploaded] = useState(false);
  const [hasImageSearchSelected, setHasImageSearchSelected] = useState(false);

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

  const form = useForm<IngredientFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialDataIngredient
      ? {
          ingredients: initialDataIngredient,
        }
      : {
          ingredients: [
            {
              name: "",
              category: "",
              measurement: "",
              source: "",

              imageURL: "",
              iconURL: "",
            },
          ],
        },
  });

  // Initialize useFieldArray to manage the ingredients array
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const onSubmit = async (data: IngredientFormValues) => {
    try {
      console.log(data);
      // setLoading(true);
      // if (initialDataIngredient) {
      //   (await axios.patch(
      //     `/api/admin/${params.storeId}/Ingredients/${params.IngredientId}`,
      //     data
      //   )) as Ingredient;
      // } else {
      //   (await axios.post(`/api/admin/${params.storeId}/Ingredients`, {
      //     ...data,
      //   })) as Ingredient;
      // }

      // router.push(`/store_admin/${params.storeId}/Ingredients`);
      // router.refresh();
      // toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      // setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/admin/${params.storeId}/Ingredients/${params.IngredientId}`
      );

      router.refresh();
      router.push(`/store_admin/${params.storeId}/Ingredients`);
      toast.arguments("SUCCESSFULLY DELETED Ingredient");
    } catch (error) {
      console.error(error);
      toast.error(
        "Cannot delete Ingredient: It is associated with categories. Please remove category associations first."
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
          className="p-4 space-y-8 w-full overflow-y-auto overflow-auto"
        >
          {fields.map((fo, index) => {
            return (
              <div key={fo.id}>
                <SecondHeading
                  title={`Ingredient ${index + 1}`}
                ></SecondHeading>
                <div className=" -mt-8 relative gap-4 items-start content-start justify-start grid grid-cols-2 p-8">
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.name`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Ingredient name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.category`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>{
                              {Object.keys(Ingredients).map()}
                              
                              }</SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.measurement`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Measurement</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Measurement"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.source`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Source</FormLabel>
                          <FormControl>
                            <Input
                              disabled={loading}
                              placeholder="Source URl"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name={`ingredients.${index}.imageURL`}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <div>
                              <ImageUpload
                                className={`${
                                  hasImageSearchSelected ? "hidden" : ""
                                }`}
                                id={`ingredients.${index}.imageURL.search`}
                                value={field.value ? [field.value] : []}
                                onChange={(url) => {
                                  field.onChange(url);
                                  setHasImageUploaded(true);
                                }}
                                onRemove={() => {
                                  field.onChange("");
                                  setHasImageUploaded(false);
                                }}
                                disabled={loading || hasImageSearchSelected}
                              ></ImageUpload>
                              <ImageSearcher
                                className={`${
                                  hasImageUploaded ? "hidden" : ""
                                }`}
                                value={field.value ?? ""}
                                id={`ingredients.${index}.imageURL.search`}
                                onImageSelect={(url: string) => {
                                  field.onChange(url);
                                  setHasImageSearchSelected(true);
                                }}
                                onRemove={() => {
                                  field.onChange("");
                                  setHasImageSearchSelected(false);
                                }}
                                disable={hasImageUploaded || loading}
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
                    name={`ingredients.${index}.iconURL`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col mt-5 ">
                        <FormLabel htmlFor={`ingredients.${index}.iconURL`}>
                          Select Icon For Your Ingredient
                        </FormLabel>
                        <FormControl className="w-1/2">
                          <IconPickerFirebase
                            id={`ingredients.${index}.iconURL`}
                            onIconSelect={(svgURL: string) =>
                              field.onChange(svgURL)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="absolute right-0 bottom-0"
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash></Trash>
                  </Button>
                </div>
              </div>
            );
          })}
          <Button
            type="button"
            variant={"secondary"}
            className=" flex justify-center items-center"
            onClick={() =>
              append({
                name: "",
                measurement: "",
                source: "",
                category: "",
                imageURL: "",
              })
            }
          >
            <Plus size={20}></Plus> Add Ingredient
          </Button>
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

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import { Manufacturer } from "@/types/api/models/Manufacturer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getApiClient } from "@/lib/api";

interface ManufacturerNameFormProps {
  initialData: Manufacturer;
  dataId: string | number;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name is required!",
  }),
});

const ManufacturerNameForm = ({
  initialData,
  dataId,
}: ManufacturerNameFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const session = useSession();

  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const apiClient = await getApiClient(session.data);
      const updatedData: Manufacturer = { ...initialData, name: values.name };
      const response = await apiClient.manufacturers.updateManufacturer(updatedData);

      if (response && "id" in response) {
        router.refresh();
        toast("Manufacturer name was updated successfully.");
        toggleEdit();
        router.refresh();
      } else {
        toast("Failed to update manufacturer.");
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong!");
    }
  };

  return (
    <div className="mt-6 border bg-gray-100 dark:bg-gray-800 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <h3 className="text-violet-500">Name</h3>
        <Button
          variant="ghost"
          onClick={toggleEdit}
          className="dark:hover:bg-gray-700 hover:bg-white transition cursor-pointer">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit name
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData?.name}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white"
                      disabled={isSubmitting}
                      placeholder="Enter title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                className="text-white bg-violet-500 hover:bg-violet-400 transition cursor-pointer">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ManufacturerNameForm;

"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createManufacturerSchema } from "@/lib/validations";
import { toast } from "sonner";
import { useState } from "react";
import { getApiClient } from "@/lib/api";
import { useSession } from "next-auth/react";

export const CreateManufacturerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const router = useRouter();
  const session = useSession();

  const isModalOpen = isOpen && type === "createManufacturer";

  const form = useForm({
    resolver: zodResolver(createManufacturerSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof createManufacturerSchema>) => {
    try {
      const apiClient = await getApiClient(session.data);
      const response = await apiClient.manufacturers.createManufacturer(values);

      if (response && "id" in response) {
        toast("Manufacturer was created successfully.");
        form.reset();
        router.refresh();
        onClose();
      } else {
        toast("Failed to create manufacturer.");
      }
    } catch (error) {
      console.error("Error creating manufacturer:", error);
      toast("There was a problem with your request.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-violet-500">
            Create Manufacturer
          </DialogTitle>
          <DialogDescription className="hidden">Create Manufacturer</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">
                      Name<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 dark:bg-zinc-300/20 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter manufacturer name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-bold">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        rows={5}
                        className="bg-zinc-300/50 dark:bg-zinc-300/20 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="Enter manufacturer description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 py-4">
              <Button
                disabled={isLoading}
                className="text-white bg-violet-500 hover:bg-violet-400 transition">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

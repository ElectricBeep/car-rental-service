"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal";

export const ManufacturersActions = () => {
  const { onOpen } = useModal();
  
  return (
    <Button
      className="text-white bg-violet-500 hover:bg-violet-400 transition cursor-pointer"
      onClick={() => {
        onOpen("createManufacturer");
      }}
    >
      <Plus className="size-4 mr-2" />
      Create Manufacturer
    </Button>
  );
};

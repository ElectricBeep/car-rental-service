"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

import ConfirmDialog from "@/components/dashboard/modals/confirm-dialog";
import { Button } from "@/components/ui/button";
import { getApiClient } from "@/lib/api";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface ManufacturerActionsProps {
  dataId: string | number;
  isTable?: boolean;
}

export const ManufacturerActions = ({ dataId, isTable = false }: ManufacturerActionsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const session = useSession();

  const onDelete = async () => {
    try {
      setIsLoading(true);

      const apiClient = await getApiClient(session.data);
      await apiClient.manufacturers.deleteManufacturer(dataId);

      router.replace("/admin/brands");
      router.refresh();
    } catch {
      toast("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ConfirmDialog onConfirm={onDelete}>
      {isTable ? (
        <DropdownMenuItem
          disabled={isLoading}
          variant="destructive"
          onSelect={(e) => e.preventDefault()}
        >
          Delete
        </DropdownMenuItem>
      ) : (
        <Button variant="destructive" disabled={isLoading} className="cursor-pointer">
          <Trash className="mr-2 size-4" />
          Delete
        </Button>
      )}
    </ConfirmDialog>
  );
};

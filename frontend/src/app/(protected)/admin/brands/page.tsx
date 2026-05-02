import { getServerSession } from "next-auth/next";
import { CaseUpper } from "lucide-react";

import { getApiClient } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { BrandsTable } from "@/components/dashboard/brands/brands-table";
import { manufacturersColumns } from "@/components/dashboard/table-columns/manufacturers-columns";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ManufacturersActions } from "@/components/dashboard/brands/manufacturers-actions";

const BrandsPage = async () => {
  const session = await getServerSession(authOptions)
  const apiClient = await getApiClient(session);

  const manufacturers = await apiClient.manufacturers.getManufacturers();

  if (!!!manufacturers.length) {
    return (
      <Empty className="h-[calc(100vh-80px)] flex items-center justify-center">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CaseUpper />
          </EmptyMedia>
          <EmptyTitle>No manufacturers yet</EmptyTitle>
          <EmptyDescription>
            You haven't created any manufacturers yet. Get started by creating your first manufacturer.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <ManufacturersActions />
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="px-8 py-4">
      <BrandsTable data={manufacturers} columns={manufacturersColumns} />
    </div>
  );
};

export default BrandsPage;

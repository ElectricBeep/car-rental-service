import { getServerSession } from "next-auth/next";

import { getApiClient } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { BrandsTable } from "@/components/dashboard/brands/brands-table";
import { manufacturersColumns } from "@/components/dashboard/table-columns/manufacturers-columns";

const BrandsPage = async () => {
  const session = await getServerSession(authOptions)
  const apiClient = await getApiClient(session);

  const manufacturers = await apiClient.manufacturers.getManufacturers();

  return (
    <div className="px-8 py-4">
      <BrandsTable data={manufacturers} columns={manufacturersColumns} />
    </div>
  );
};

export default BrandsPage;

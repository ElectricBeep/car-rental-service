import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

import { getApiClient } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { ManufacturerDetails } from "@/components/dashboard/brands/manufacturer-details";

interface BrandPageProps {
  params: {
    brandId: string;
  };
}

const BrandPage = async ({
  params: promiseParams,
}: BrandPageProps) => {
  const params = await promiseParams;
  const { brandId } = params;

  if (!brandId) {
    return notFound();
  }

  const session = await getServerSession(authOptions)
  const apiClient = await getApiClient(session);

  const manufacturer = await apiClient.manufacturers.getManufacturer(brandId);

  if (!manufacturer) {
    return notFound();
  }

  return (
    <ManufacturerDetails data={manufacturer} />
  );
};

export default BrandPage;

import { LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { Manufacturer } from "@/types/api/models/Manufacturer";
import { IconBadge } from "@/components/dashboard/icon-badge";
import { ManufacturerActions } from "./manufacturer-actions";
import ManufacturerNameForm from "./forms/manufacturer-name-form";
import ManufacturerDescriptionForm from "./forms/manufacturer-description-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ManufacturerDetailsProps {
  data: Manufacturer;
}

export const ManufacturerDetails = ({ data }: ManufacturerDetailsProps) => {
  return (
    <div className="px-8 py-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/brands">Brands</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-violet-500 font-bold">Manufacturer Edit</h1>
        <ManufacturerActions dataId={data.id} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10  mb-10">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Manufacturer details (<span className="text-violet-500 font-semibold">{data.id}</span>)</h2>
          </div>
          <ManufacturerNameForm initialData={data} dataId={data.id} />
          <ManufacturerDescriptionForm initialData={data} dataId={data.id} />
        </div>
      </div>
    </div>
  );
};

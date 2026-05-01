"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { ArrowUpDown, ChevronRight, Fingerprint } from "lucide-react";
import { Manufacturer } from "@/types/api/models/Manufacturer";
import { formatDate } from "@/lib/utils";

export const manufacturersColumns: ColumnDef<Manufacturer>[] = [
  {
    accessorKey: "image",
    header: "Logo",
    size: 20,
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.image ?? "/no-image.png"}
          alt={row.original.name}
          height={40}
          width={40}
          className="rounded-full object-cover h-10 w-10"
        />
      );
    },
  },
  {
    accessorKey: "id",
    header: "Id",
    size: 120,
    filterFn: (row, columnId, filterValue) =>
      String(row.getValue(columnId)).includes(String(filterValue)),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <Fingerprint className="size-6 text-violet-500" />
          <p>{row.original.id}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button className="cursor-pointer" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    size: 200,
    cell: ({ row }) => <p>{row.original.name}</p>,
  },
  {
    accessorKey: "description",
    header: "Description",
    size: 800,
    cell: ({ row }) => {
      return (
        <>
          {row.original.description ? (
            <p>{row.original.description}</p>
          ) : (
            <p className="text-muted-foreground italic">No description</p>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button className="cursor-pointer" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    size: 200,
    cell: ({ row }) => {
      return (
        <>
          {row.original.createdAt ? (
            <p>{formatDate(row.original.createdAt)}</p>
          ) : (
            <p className="text-muted-foreground italic">No date</p>
          )}
        </>
      );
    },
  },
  {
    id: "action",
    header: "Action",
    size: 20,
    cell: ({ row }) => {
      const { id } = row.original;
      return (
        <Link href={`/admin/brands/${id}`}>
          <div className="px-2 py-1 dark:hover:bg-gray-800 hover:bg-gray-200 rounded-md transition w-full flex justify-end">
            <ChevronRight className="text-violet-500" />
          </div>
        </Link>
      );
    },
  },
];

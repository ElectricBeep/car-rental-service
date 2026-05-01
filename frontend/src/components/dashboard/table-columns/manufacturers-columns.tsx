"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight, Fingerprint } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Manufacturer } from "@/types/api/models/Manufacturer";

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
    accessorFn: (row) => row.id,
    header: "Id",
    size: 120,
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
    accessorFn: (row) => row.name,
    header: "Name",
    size: 200,
    cell: ({ row }) => {
      return (
        <p>{row.original.name}</p>
      );
    },
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

"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import { ArrowUpDown, ChevronRight, Fingerprint, MoreHorizontalIcon } from "lucide-react";
import { Manufacturer } from "@/types/api/models/Manufacturer";
import { formatDate } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ManufacturerActions } from "../brands/manufacturer-actions";

export const manufacturersColumns: ColumnDef<Manufacturer>[] = [
  {
    accessorKey: "image",
    header: "Logo",
    size: 50,
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.image ?? "/no-image.png"}
          alt={row.original.name}
          height={40}
          width={40}
          className="rounded-full object-cover h-auto w-auto"
        />
      );
    },
  },
  {
    accessorKey: "id",
    header: "Id",
    size: 100,
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
    size: 760,
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
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <MoreHorizontalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/admin/brands/${id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <ManufacturerActions dataId={row.original.id} isTable={true} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

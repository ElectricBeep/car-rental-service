"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal";
import { Plus } from "lucide-react";
import { Manufacturer } from "@/types/api/models/Manufacturer";

interface BrandsTableProps {
  columns: ColumnDef<Manufacturer>[];
  data: Manufacturer[];
}

export const BrandsTable = ({ columns, data }: BrandsTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const { onOpen } = useModal();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-violet-500 font-bold">Manufacturers</h1>
        <div className="flex items-center gap-x-2">
          <Button
            className="text-white bg-violet-500 hover:bg-violet-400 transition"
            onClick={() => {
              onOpen("createManufacturer");
            }}
          >
            <Plus className="size-4 mr-2" />
            Create Manufacturer
          </Button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center py-4 gap-2 mt-6">
        <Input
          type="number"
          placeholder="Filter by id..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-xs bg-zinc-300/50 dark:bg-zinc-300/20 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={data.length === 0}
        />
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-xs bg-zinc-300/50 dark:bg-zinc-300/20 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          disabled={data.length === 0}
        />
      </div>
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader className="bg-violet-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-white" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-muted-foreground text-center">
                  No Body Parts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between w-full mt-4">
          <Button
            variant="ghost"
            className="hover:text-primary transition"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <div className="flex w-30 items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="ghost"
            className="hover:text-primary transition"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

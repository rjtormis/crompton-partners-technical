"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CustomTableHeader } from "./custom-table-header";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { Property } from "@prisma/client";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  setSelectedListings: Dispatch<SetStateAction<Property[]>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSelectedListings,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    price: false,
    bedroom: false,
    bathroom: false,
    description: false,
  });
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // Memoize the selected rows instead of using the table state
  // which will cause table to re-render always and throws
  // maximum update depth exceeded error
  const selectedRows = table.getSelectedRowModel().rows;
  const selected = useMemo(() => {
    return selectedRows.map((row) => row.original) as Property[];
  }, [selectedRows]);

  useEffect(() => {
    if (selected.length >= 1) {
      setSelectedListings(selected);
    } else {
      setSelectedListings([]);
    }
  }, [selected, setSelectedListings]);

  return (
    <div className="rounded-md border">
      <CustomTableHeader table={table}>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, {
                      ...cell.getContext(),
                      listing: row.original,
                      // setSelectedProject: setSelectedProject,
                    })}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </CustomTableHeader>
    </div>
  );
}

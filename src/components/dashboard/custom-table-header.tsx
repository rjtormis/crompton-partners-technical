"use client";

import { flexRender } from "@tanstack/react-table";

import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ArrowDownIcon, ArrowUpIcon, CaretSortIcon } from "@radix-ui/react-icons";

type CustomTableHeaderProps = {
  table: any;
  excludedColumnHeader?: string[];
  children: JSX.Element;
};

export function CustomTableHeader({
  table,
  excludedColumnHeader,
  children,
}: CustomTableHeaderProps) {
  const hasSelectColumn = table.getHeaderGroups()[0].headers.some((h: any) => h.id === "select");
  return (
    <Table className="w-full table-auto relative">
      <TableHeader className="z-10 sticky top-0 bg-background">
        {table.getHeaderGroups().map((headerGroup: any) => (
          <TableRow key={headerGroup.id} className="dark:text-white">
            {headerGroup.headers.map((header: any, index: number) => {
              // We used here TableCell instead of TableHead because "sticky" has no effect on "th".
              // It is also specifically look for two column names "select" and "question", that whenever we see them, we make the column header sticky.
              return (
                <TableCell
                  key={index}
                  onClick={header.column.getToggleSortingHandler()}
                  className={`${
                    header.column.id === "select"
                      ? "sticky left-0 min-w-[32px] bg-background"
                      : header.column.id === "question"
                      ? `bg-background sticky ${hasSelectColumn ? "left-[32px]" : "left-0"}`
                      : ""
                  }`}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center ">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {table.getRowModel().rows?.length > 0 && (
                        <span className="inline-block" id={header.column.id}>
                          {!table.getColumn(header.column.id).getCanSort() ? (
                            ""
                          ) : header.column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon className="ml-2 h-4 w-4" />
                          ) : header.column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon className="ml-2 h-4 w-4" />
                          ) : (
                            <CaretSortIcon className="ml-2 h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      {children}
    </Table>
  );
}

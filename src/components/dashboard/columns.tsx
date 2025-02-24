/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Property } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import UpdateListingDialog from "./update-listing-dialog";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<Property>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="capitalize">{row.getValue("type")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div className="lowercase">{row.getValue("location")}</div>,
  },
  {
    accessorKey: "bathroom",
    enableHiding: true,
  },
  {
    accessorKey: "bedroom",
    enableHiding: true,
  },
  {
    accessorKey: "price",
    enableHiding: true,
  },
  {
    accessorKey: "description",
    enableHiding: true,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row, listing }) => {
      return (
        <div className="flex items-center gap-2">
          <UpdateListingDialog listing={listing} />
          <Link href={`/listings/${listing.id}`} target="_blank">
            <Button variant="outline" size="icon">
              <Eye />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

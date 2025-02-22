"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Property } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import UpdateListingDialog from "./update-listing-dialog";

export const properties: Property[] = [
  {
    id: "m5gr84i9",
    name: "Luxury Villa",
    description: "A beautiful beachfront villa with stunning views.",
    type: "Villa",
    status: "success",
    location: "Miami, FL",
    bathroom: 3,
    bedroom: 5,
    price: 1200000,
    userId: "user123",
  },
  {
    id: "3u1reuv4",
    name: "Modern Apartment",
    description: "A high-rise apartment in the city center.",
    type: "Apartment",
    status: "success",
    location: "New York, NY",
    bathroom: 2,
    bedroom: 3,
    price: 750000,
    userId: "user456",
  },
  {
    id: "derv1ws0",
    name: "Cozy Cottage",
    description: "A quiet countryside cottage surrounded by nature.",
    type: "Cottage",
    status: "processing",
    location: "Asheville, NC",
    bathroom: 1,
    bedroom: 2,
    price: 250000,
    userId: "user789",
  },
  {
    id: "5kma53ae",
    name: "Penthouse Suite",
    description: "A luxury penthouse with skyline views.",
    type: "Penthouse",
    status: "success",
    location: "Los Angeles, CA",
    bathroom: 4,
    bedroom: 6,
    price: 2200000,
    userId: "user101",
  },
  {
    id: "bhqecj4p",
    name: "Suburban Home",
    description: "A spacious family home in a quiet neighborhood.",
    type: "House",
    status: "failed",
    location: "Dallas, TX",
    bathroom: 3,
    bedroom: 4,
    price: 600000,
    userId: "user102",
  },
];

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
    cell: ({ row }) => {
      const payment = row.original;

      return <UpdateListingDialog />;
    },
  },
];

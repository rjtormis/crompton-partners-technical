import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "../ui/input";
import NewListingDialog from "./new-listing-dialog";
import DeleteListingDialog from "./delete-listing-dialog";
import { prisma } from "@/app/api/auth/[...nextauth]/options";

async function DashboardListing() {
  const properties = await prisma.property.findMany({});

  return (
    <div className="flex-grow flex flex-col justify-between">
      {/* TODO: Move to client component */}
      <div className="flex gap-2 flex-col">
        <div className="w-[50%] flex gap-2">
          <Input placeholder="Search" />
          <NewListingDialog />
          <DeleteListingDialog />
        </div>
        <DataTable columns={columns} data={properties} />
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default DashboardListing;

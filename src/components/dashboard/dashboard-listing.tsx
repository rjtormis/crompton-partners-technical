import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { columns, properties } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "../ui/input";
import NewListingDialog from "./new-listing-dialog";
import DeleteListingDialog from "./delete-listing-dialog";

function DashboardListing() {
  return (
    <div className="flex-grow flex flex-col justify-between">
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

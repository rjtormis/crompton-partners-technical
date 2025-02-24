"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Input } from "../ui/input";
import NewListingDialog from "./new-listing-dialog";
import DeleteListingDialog from "./delete-listing-dialog";
import { Property } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PaginationWithLinks } from "../pagination-with-links";
import { debounce } from "lodash";

function DashboardListing({ totalProperties }: { totalProperties: number }) {
  const [listings, setListings] = useState<Property[] | null>([]);
  const [search, setSearch] = useState<string>("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;

  const [selectedListings, setSelectedListings] = useState<Property[]>([]);

  // We need to debounce or apply debounce in order for us not to clog the server with multiple requests.
  const dSearch = debounce((value) => {
    setDebounceSearch(value);
  }, 500);

  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage) params.append("page", currentPage.toString());
    if (search) params.append("search", debounceSearch);

    const fetchListings = async () => {
      setRefetch(false);
      setLoading(true);
      const res = await fetch(`/api/dashboard/property?${params.toString()}`);
      const data = await res.json();
      setListings(data.properties);
      setLoading(false);
    };
    fetchListings();
  }, [refetch, currentPage, debounceSearch]);

  return (
    <div className="flex-grow flex flex-col justify-between">
      <div className="flex gap-2 flex-col">
        <div className="w-[50%] flex gap-2">
          <Input
            value={search}
            placeholder="Search"
            onChange={(e) => {
              dSearch(e.target.value);
              setSearch(e.target.value);
            }}
          />
          <NewListingDialog setRefetch={setRefetch} />
          <DeleteListingDialog selectedListings={selectedListings} setRefetch={setRefetch} />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataTable
            columns={columns}
            data={listings as Property[]}
            setSelectedListings={setSelectedListings}
          />
        )}
      </div>
      {listings && listings.length === 6 ? (
        <PaginationWithLinks
          totalCount={totalProperties}
          page={currentPage}
          pageSize={6}
          search={search}
        />
      ) : null}
    </div>
  );
}

export default DashboardListing;

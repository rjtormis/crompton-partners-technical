"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useMemo, useState } from "react";
import Hero from "@/components/hero";
import dynamic from "next/dynamic";
import ListingItem from "@/components/list-item";

import { PaginationWithLinks } from "@/components/pagination-with-links";
import { Property } from "@prisma/client";
import { Session } from "next-auth";
import { useSearchParams } from "next/navigation";
import { debounce } from "lodash";

function Listings({
  session,
  totalProperties,
}: {
  session?: Session | null;
  totalProperties: number;
}) {
  const [listings, setListings] = useState<Property[] | null>([]); // const totalProperties = await prisma.property.count();
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;

  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map-component"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  // We need to debounce or apply debounce in order for us not to clog the server with multiple requests.
  const dSearch = useMemo(
    () =>
      debounce((value) => {
        setDebounceSearch(value);
      }, 500),
    []
  );

  useEffect(() => {
    const params = new URLSearchParams();

    if (currentPage) params.append("page", currentPage.toString());
    if (search) params.append("search", debounceSearch);

    const fetchListings = async () => {
      setLoading(true);
      const res = await fetch(`/api/dashboard/property?${params.toString()}`);
      const data = await res.json();
      setListings(data.properties);
      setLoading(false);
    };
    fetchListings();
  }, [currentPage, debounceSearch]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero session={session} />
      <div className="flex-grow grid grid-cols-3 gap-4 ">
        <div className="m-4 col-span-2 flex flex-col">
          {/* Search  */}
          <div className="flex gap-4">
            <Input
              value={search}
              placeholder="Search"
              onChange={(e) => {
                setSearch(e.target.value);
                dSearch(e.target.value);
              }}
            />
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="flex-grow">
                <div className="my-4 grid grid-cols-3 gap-4">
                  {listings && listings.length > 0
                    ? listings.map((l) => <ListingItem key={l.id} listing={l} />)
                    : null}
                </div>
              </div>

              <div className="">
                <PaginationWithLinks
                  totalCount={totalProperties}
                  page={1}
                  pageSize={6}
                  search={search}
                />
              </div>
            </>
          )}
        </div>
        {loading ? <div>Loading Map</div> : <Map listings={listings as Property[]} />}
      </div>
    </div>
  );
}

export default Listings;

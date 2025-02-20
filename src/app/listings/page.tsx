"use client";
import Hero from "@/components/hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

function ListingsPage() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/map-component"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <div className="flex-grow grid grid-cols-2 gap-4 ">
        <div className="m-4">
          {/* Search  */}
          <div className="flex gap-4">
            <Input placeholder="Search real-estate" />
            <Button>Search</Button>
          </div>

          {/* Listings */}
        </div>

        {/* TODO: Transfer to Client Component */}
        <Map />
      </div>
    </div>
  );
}

export default ListingsPage;

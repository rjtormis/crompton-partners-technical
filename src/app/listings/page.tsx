"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useMemo } from "react";
import Hero from "@/components/hero";
import dynamic from "next/dynamic";
import ListingItem from "@/components/list-item";

import image1 from "@/assets/yelp1.png";
import image2 from "@/assets/yelp2.jpg";

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
      <div className="flex-grow grid grid-cols-3 gap-4 ">
        <div className="m-4 col-span-2">
          {/* Search  */}
          <div className="flex gap-4">
            <Input placeholder="Search real-estate" />
            <Button>Search</Button>
          </div>

          {/* Listings */}
          <div className="my-4 grid grid-cols-3 gap-4">
            <ListingItem image={image1} name="TEST" bathrooms={1} price={1} location="dubai" />
            <ListingItem image={image2} name="TEST" bathrooms={1} price={1} location="dubai" />
            <ListingItem image={image1} name="TEST" bathrooms={1} price={1} location="dubai" />
            <ListingItem image={image1} name="TEST" bathrooms={1} price={1} location="dubai" />
            <ListingItem image={image2} name="TEST" bathrooms={1} price={1} location="dubai" />
            <ListingItem image={image1} name="TEST" bathrooms={1} price={1} location="dubai" />
          </div>
        </div>

        {/* TODO: Transfer to Client Component */}
        <Map />
      </div>
    </div>
  );
}

export default ListingsPage;

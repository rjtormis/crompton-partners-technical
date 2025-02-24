import Hero from "@/components/hero";
import React from "react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bath, Bed, Building, Calendar, Map } from "lucide-react";
import { prisma } from "@/app/api/auth/[...nextauth]/options";
import NotFound from "./not-found";
import Head from "next/head";

export default async function page(props: { params: Promise<{ listingId: string }> }) {
  const params = await props.params;

  const property = await prisma.property.findFirst({
    where: {
      id: params.listingId,
    },
  });

  if (property) {
    const images = property.images as string[];
    const user = await prisma.user.findFirst({
      where: {
        id: property.userId,
      },
    });
    return (
      <div className="flex flex-col min-h-screen">
        <Head>
          <title>Palm Sunset | {property.name} </title>
        </Head>
        <Hero />
        <div className="m-10">
          {/* Image Section */}
          <div className="grid grid-cols-2 gap-4 my-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${images[0]}`}
              alt="yelp"
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
              width={0}
              height={0}
            />
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, index) => {
                if (index > 0) {
                  return (
                    <Image
                      key={index}
                      src={`${process.env.NEXT_PUBLIC_AWS_LINK}/${img}`}
                      alt="yelp"
                      sizes="100vw"
                      style={{ width: "100%", height: "100%" }}
                      width={0}
                      height={0}
                    />
                  );
                }
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="flex flex-col gap-6">
              <h1 className="text-2xl font-semibold">{property.name}</h1>

              {/* Description */}
              <p className="text-gray-600 text-sm">{property.description}</p>

              {/* Posted By Card */}
              <div>
                <div className="p-4 flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-gray-500">Posted by:</p>
                    <p className="font-semibold">{user?.name}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Key Information */}
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-semibold">Key Information</h2>

              {/* Key Information Grid */}
              <div className="grid grid-cols-2 gap-4 p-4  rounded-lg ">
                <div>
                  <div className="flex gap-2 items-center">
                    <Calendar size={18} /> <span>Date Posted</span>
                  </div>
                  <p className="font-semibold">
                    {new Date(property.datePosted).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <div className="flex gap-2 items-center">
                    <Bed size={18} /> <span>Number of Rooms</span>
                  </div>
                  <p className="font-semibold">{property.bedroom}</p>
                </div>

                <div>
                  <div className="flex gap-2 items-center">
                    <Bath size={18} /> <span>Number of Bathroom</span>
                  </div>
                  <p className="font-semibold">{property.bathroom}</p>
                </div>

                <div>
                  <div className="flex gap-2 items-center">
                    <Building size={18} /> <span>Property Type</span>
                  </div>
                  <p className="font-semibold">{property.type}</p>
                </div>

                <div>
                  <div className="flex gap-2 items-center">
                    <Map size={18} /> <span>Location</span>
                  </div>
                  <p className="font-semibold">{property.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <NotFound />;
  }
}

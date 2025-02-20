import Hero from "@/components/hero";
import React from "react";
import image1 from "@/assets/yelp1.png";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function SpecificListing() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <div className="m-10">
        {/* Image Section */}
        <Image src={image1} alt="yelp" className="rounded-lg w-full h-auto object-cover mb-6" />

        {/* Main Content */}
        <div className="grid grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Hey</h1>

            {/* Description */}
            <p className="text-gray-600 text-sm">
              This is a short description that gives more context to the user. It can explain the
              listing details or provide a summary of the property.
            </p>

            {/* Posted By Card */}
            <div>
              <div className="p-4 flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-500">Posted by:</p>
                  <p className="font-semibold">John Doe</p>
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
                <p className="text-gray-500">📅 Date Posted</p>
                <p className="font-semibold">Jan 12, 2025</p>
              </div>

              <div>
                <p className="text-gray-500">🛏️ Number of Rooms</p>
                <p className="font-semibold">3</p>
              </div>

              <div>
                <p className="text-gray-500">🛁 Bathrooms</p>
                <p className="font-semibold">2</p>
              </div>

              <div>
                <p className="text-gray-500">🏡 Property Type</p>
                <p className="font-semibold">Apartment</p>
              </div>

              <div className="col-span-2">
                <p className="text-gray-500">📍 Location</p>
                <p className="font-semibold">New York, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecificListing;
